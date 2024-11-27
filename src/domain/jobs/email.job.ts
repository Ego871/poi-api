import cron from 'node-cron';
import 'dotenv/config'
import { envs } from '../../config/envs.plugin';
import { EmailService } from '../services/email.service';
import { generatePOIEmailTemplate } from '../templates/email.template';
import { POIModel } from '../../data/models/poi.model';

export const emailJob = () => {
    const emailService = new EmailService();

    cron.schedule("*/10 * * * * *", async ()=>{
        try {
            const POIList = await POIModel.find({ isSent: false });
            
            if (!POIList.length){
                console.log("No hay nuevos puntos de interés por enviar.");
                return;
            }

            console.log(`Procesando ${POIModel.length} puntos de interés.`)
            await Promise.all(
                POIList.map(async (POI)=>{
                    try {
                        const htmlBody = generatePOIEmailTemplate(POI.lat, POI.lng, POI.title, POI.imageUrl, POI.category, POI.description)
                        await emailService.sendEmail({
                            to: envs.MAIL_USER,
                            subject: "Nuevo Punto de Interés añadido",
                            htmlBody: htmlBody
                        });
                        console.log(`Email enviado para el punto de interés con ID: ${POI._id}`)
    
                        let updatePOI = {
                            lat: POI.lat,
                            lng: POI.lng,
                            isSent: true,
                            title: POI.title,
                            imageUrl: POI.imageUrl,
                            category: POI.category,
                            description: POI.description
                        };
    
                        await POIModel.findByIdAndUpdate(POI._id, updatePOI);
                        console.log(`Punto de interés actualizado para el ID: ${POI._id}`)
                    } catch (error) {
                        console.error("Error al procesar el punto de interés")
                    }
                })
            );

        } catch (error) {
            console.error("Error durante el envío de correo")
        }
    });
}
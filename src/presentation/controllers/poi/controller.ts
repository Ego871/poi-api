import { Request, Response } from "express";
import { POIModel } from "../../../data/models/poi.model";
import { EmailService } from "../../../domain/services/email.service";

export class POIController{
    public getPOIList = async(req: Request, res: Response) => {
        try {
            const POIList = await POIModel.find();
            return res.json(POIList);
        } catch (error) {
            return res.json([])
        }
    }

    public createPOI = async(req: Request, res: Response) => {
        try {
            const { lat, lng, title, imageUrl, category, description } = req.body;
            const newPOI = await POIModel.create({
                lat,
                lng,
                title,
                imageUrl,
                category,
                description
            });
            const emailService = new EmailService();
            res.json(newPOI);
        } catch (error) {
            res.json({message:"Error creando registro"});
        }
    }

    public updatePOI = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { lat, lng, title, imageUrl, category, description } = req.body;

            await POIModel.findByIdAndUpdate(id, {
                lat,
                lng,
                title,
                imageUrl,
                category,
                description,
                isSent: true
            });

            const updatedPOI = await POIModel.findById(id);

            return res.json(updatedPOI)
        } catch (error) {
            return res.json({message:"Ocurrio un error al actualizar un punto de interés"});
        }
    }

    public deletePOI = async(req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await POIModel.findByIdAndDelete(id);
            return res.json({message:"Punto de Interés Eliminado"})
        } catch (error) {
            return res.json({message:"Ocurrio un error al eliminar un punto de interés"});
        }
    }
}
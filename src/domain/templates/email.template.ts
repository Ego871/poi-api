import { envs } from "../../config/envs.plugin";

export function generatePOIEmailTemplate(lat: number, lng: number, title: string, imageUrl: string, category: string, description: string): string {
    const mapboxUrl = generateMapboxStaticImageURL(lat, lng)
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: Arial, sans-serif;
                color: #333;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
            }
            .container {
                width: 80%;
                margin: 0 auto;
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
            }
            .header {
                background: #1BA532;
                color: #ffffff;
                padding: 10px;
                border-radius: 8px 8px 0 0;
                text-align: center;
            }
            .content {
                margin: 20px 0;
            }
            .content h2 {
                color: #1BA532;
            }
            .footer {
                background-color: #f4f4f4;
                text-align: center;
                font-size: 12px;
                color: #777;
                padding: 10px;
                border-radius: 0 0 8px 8px;
            }
            .map-img{
                width: 100%;
                height: auto;
                border-radius: 10px;
            }
        </style>
        <title>Nuevo Punto de Interés Agregado</title>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Confirmación de Generación de Punto de Interés</h1>
            </div>
            <div class="content">
                <h2>Estimado Usuario,</h2>
                <p>El siguiente punto de interés en la Universidad LaSalle Bajío Campus Campestre ha sido agregado exitosamente:</p>
                <p><strong>Título:</strong> ${title}</p>
                <img src="${imageUrl}"/>
                <p><strong>Categoría:</strong> ${category}</p>
                <p><strong>Descripción:</strong> ${description}</p>
                <img class="map-img" src="${mapboxUrl}"/>
            </div>
            <div class="footer">
                <p>Este es un correo generado automáticamente. Por favor, no responda a este mensaje.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL= (lat:number, lng:number) =>{
    const accessToken = envs.MAPBOX_ACCESS_TOKEN; // Reemplaza con tu token de acceso de Mapbox
    const zoom = 18; // Nivel de zoom
    const width = 800; // Ancho de la imagen
    const height = 500; // Altura de la imagen

    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}
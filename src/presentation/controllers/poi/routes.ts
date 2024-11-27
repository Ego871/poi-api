import { Router } from "express";
import { POIController } from "./controller";

export class POIRoutes{
    static get routes() : Router{
        const router = Router();
        const controller = new POIController();

        router.get("/", controller.getPOIList);

        router.post("/", controller.createPOI);

        router.put("/:id", controller.updatePOI);

        router.delete("/:id", controller.deletePOI);
        
        return router
    }
}
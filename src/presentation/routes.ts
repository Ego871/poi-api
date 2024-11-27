import { Router } from "express";
import { POIRoutes } from "./controllers/poi/routes";

export class AppRoutes{
    static get routes() : Router{
        const router = Router();
        router.use("/api/poi", POIRoutes.routes);
        return router;
    }
}
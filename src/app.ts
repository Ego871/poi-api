import express from "express";
import 'dotenv/config'
import { envs } from "./config/envs.plugin";
import { MongoDatabase } from "./data/init";
import { AppRoutes } from "./presentation/routes";
import { emailJob } from "./domain/jobs/email.job";

const app = express();

app.use(express.json());
app.use(AppRoutes.routes);

(async () => {
    await MongoDatabase.connect({ 
        dbName: "POI_API",
        mongoUrl: envs.MONGO_URL ?? "" 
    });
})();

app.listen(envs.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${envs.PORT}`)
    emailJob();
});

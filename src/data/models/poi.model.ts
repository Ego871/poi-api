import mongoose from "mongoose";
import 'dotenv/config'
import { envs } from "../../config/envs.plugin";

const POISchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    isSent: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: envs.DEFAULT_IMAGE_URL
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export const POIModel = mongoose.model("POI", POISchema)

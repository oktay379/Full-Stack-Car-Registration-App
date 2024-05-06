import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    email: {
        type: String
    },
    plate: {
        type: String,
        required: true
    }
},{timestamps: true});

export const CarModel = mongoose.model("cars", CarSchema);

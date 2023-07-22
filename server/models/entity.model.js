import mongoose from "mongoose";

const Entity = mongoose.model(
    "Entity",
    new mongoose.Schema({
        name: String,
        coordinate: {
            x: Number,
            y: Number
        },
        labels: []
    })
);

export default Entity;

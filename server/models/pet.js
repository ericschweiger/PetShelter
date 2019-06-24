const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "The name of your pet must be at least 3 characters"],
        maxlength: [30, "Why is your pet's name so long, keep it under 30 characters"]
    },
    species: {
        type: String,
        required: [true, "Species is required"],
        minlength: [3, "The species of your pet must be at least 3 characters"],
        maxlength: [50, "What species has more than 50 characters?"] 
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [3, "The description of your pet must be at least 3 characters."],
        maxlength: [140, "Keep your descirption to under twitter length"]
    },
    skill1: {
        type: String,
        maxlength: [60, "Don't overdo your skill description"]
    },
    skill2: {
        type: String,
        maxlength: [60, "Don't overdo your skill description"]
    },
    skill3: {
        type: String,
        maxlength: [60, "Don't overdo your skill description"]
    },
    likes: 0
}, {timestamps: true})

mongoose.model("Pet", PetSchema);
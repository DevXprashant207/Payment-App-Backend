const mongoose = require("mongoose");
const userSchema = new  mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minLength: 3,
            maxLength: 30
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        password: {
            type: String,
            required: true,
            minLength: 6
        },
    }
);
module.exports = mongoose.model("User", userSchema);
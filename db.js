const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/PayTM");
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
        firstname: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        lastname: {
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
// Account model
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
// Create a model from the schema
const Account = mongoose.model('Account', accountSchema);
const User = mongoose.model('User', userSchema);
module.exports = {
	User,
    Account
}; 
const mongoose = require("mongoose");

// ✅ Always handle connection errors
mongoose.connect("mongodb+srv://devXprashant207:264prashant@cluster0.95zeyoz.mongodb.net/Payment-App", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.error("MongoDB connection error ❌:", err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
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
    }
}, { timestamps: true }); // ✅ optional: adds createdAt and updatedAt fields

// ✅ Account Schema
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

// ✅ Models
const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

// ✅ Export
module.exports = {
    User,
    Account
};

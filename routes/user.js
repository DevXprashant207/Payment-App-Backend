// backend/routes/user.js
const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs -> username should be an email, password should be at least 6 characters, and firstname/lastname should not be empty."
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    try {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        })
        const userId = user._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })

        const token = jwt.sign({
            userId
        }, JWT_SECRET, { expiresIn: '30d' });

        return res.json({
            message: "User created successfully",
            token: token
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error creating user"
        })
    }
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (user) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '30d' });
            return res.json({
                token: token,
                message: "Login successful"
            });
        }
        
        return res.status(411).json({
            message: "Error while logging in"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        })
    }
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional(),
})

router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    
    if (!success) {
        return res.status(411).json({
            message: "Error while updating information"
        });
    }

    try {
        await User.updateOne(
            { _id: req.userId },
            { $set: req.body }
        );

        return res.json({
            message: "Updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error updating user"
        });
    }
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    try {
        const users = await User.find({
            $or: [{
                firstname: {
                    "$regex": filter
                }
            }, {
                lastname: {
                    "$regex": filter
                }
            }]
        })

        return res.json({
            user: users.map(user => ({
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                _id: user._id
            }))
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching users"
        })
    }
})

module.exports = router;
const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message: "Missing or malformed token"});
    }

    const token = authHeader.split(' ')[1];

    try {
        console.log("JSWT is " + JWT_SECRET + "  prashant");
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        console.log("!638146666666666666666");
        req.userId = decoded.userId || decoded.id;
        console.log("812387");
        console.log(req.userId);
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: "Invalid token" });
        }
        return res.status(403).json({ message: "Token verification failed" });
    }
};

module.exports = {
    authMiddleware
}
const jwt = require("jsonwebtoken");

const authVerify = (req, res, next) => {
    const Token = req.headers["authorization"].split(" ")[1];
    if (!Token) {
        return res.status(401).json({ message: "You need to Login" });
    }
    try {
        const decoded = jwt.verify(Token, process.env.JWT_SECRET);
        const { _id, username, image } = decoded;
        req.userid = _id;
        req.username = username;
        req.image = image;
        next();
    } catch (error) {
        if(error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token Expired" });
        }
        console.error(error);
        res.status(401).json({ message: "Invalid Token" });
        // next("Invalid Token");
    }
};



module.exports = authVerify;
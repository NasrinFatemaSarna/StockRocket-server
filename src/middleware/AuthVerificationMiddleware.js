

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers["token"];
        if (!token) {
            return res.status(401).json({
                status: "failed",
                message: "No token provided"
            });
        }

        jwt.verify(token, "sarna123", (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    status: "failed",
                    message: "Auth failed"
                });
            } else {
                req.headers.email = decoded.data;
                next();
            }
        });

    } catch (error) {
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        });
    }
};



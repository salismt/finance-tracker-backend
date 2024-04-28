const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];  // Authorization: Bearer TOKEN
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Unauthorized' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Authorization header is required');
    }
}

module.exports = isAuthenticated;

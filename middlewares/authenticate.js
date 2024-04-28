const jwt = require('jsonwebtoken');

function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];  // Authorization: Bearer TOKEN
        jwt.verify(token, 'your_secret_key', (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: 'Unauthorized' });
            }
            req.user = user;  // Add user info to request object
            next();
        });
    } else {
        res.status(401).send('Authorization header is required');
    }
}

module.exports = isAuthenticated;

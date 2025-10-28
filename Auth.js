

const jwt = require('jsonwebtoken')

const ensureAuthentication = (req, res, next) => {
    const auth = req.headers['authorization']
    if (!auth) {
        return res.status(403).json({ message: 'jwt token required' });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET)
        req.existingUser = decoded;
        next()
    }
    catch (error) {
        return res.status(400).json({ message: 'jwt token unauthorised' });
    }
}
module.exports = ensureAuthentication
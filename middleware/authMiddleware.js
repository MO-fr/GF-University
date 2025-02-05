import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
    const token = req.cookies.auth_token;  // Ensure token is named correctly

    if (!token) {
        return res.redirect('/');  // Redirect to homepage or login page
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.clearCookie('auth_token'); // Clear invalid/expired token
            return res.redirect('/login');  // Redirect user to login page
        }
            
        req.user = decoded;  // Attach user info to request object
        next();
    });
};

export default requireAuth;

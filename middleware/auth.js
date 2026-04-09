import jwt from 'jsonwebtoken';

// simple secret key
const SECRET = "mysecretkey";

export default function auth(req, res, next) {
  try {
    // get token from Authorization header
    const header = req.header('Authorization');
    if (!header) return res.status(401).json({ error: "No token provided" });

    const token = header.replace('JWT ', '');

    // verify token
    const decoded = jwt.verify(token, SECRET);

    // attach user info to request
    req.user = decoded; // decoded contains { id: USER_ID }

    next(); // proceed to next middleware/route
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
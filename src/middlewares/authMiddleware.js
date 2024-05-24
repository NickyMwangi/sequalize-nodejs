import jwt from 'jsonwebtoken'

export const jwtTokenVerification = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied.', message: 'wrong authorization token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    next();
  }
  catch (err) {
    res.status(401).json({ error: 'Access denied.', message: 'wrong authorization token' })
  }
}
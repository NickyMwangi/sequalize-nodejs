import jwt from 'jsonwebtoken'
import user from '../../db/models/user.js';

export const jwtTokenVerification = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied.', message: 'invalid authorization token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    const thisuser = await user.findByPk(decoded.id);
    if (!thisuser)
      return res.status(401).json({ error: 'Access denied.', message: 'user no long exists for this token.' });
    return next();
  }
  catch (err) {
    return res.status(401).json({ error: 'Access denied.', message: 'invalid authorization token' })
  }
}
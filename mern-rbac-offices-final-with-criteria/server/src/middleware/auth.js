import jwt from 'jsonwebtoken';

export const ROLES = {
  ADMIN: 'ADMIN',
  REGISTER: 'REGISTER',
  POE: 'POE',
  LOGISTIC: 'LOGISTIC',
  SEXUAL_HC: 'SEXUAL_HC',
  EXAM_CONTROLLER: 'EXAM_CONTROLLER',
  IT: 'IT',
  ADMISSION: 'ADMISSION',
  FINANCE: 'FINANCE',
  CR_IT: 'CR_IT',
  PROCTORIAL: 'PROCTORIAL',
  IQAC: 'IQAC',
  GCIA: 'GCIA',
  CCD: 'CCD',
  CLCS: 'CLCS',
  STUDENT_AFFAIRS: 'STUDENT_AFFAIRS'
};

export function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    // payload should include username and role
    req.user = { username: payload.username, role: payload.role };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

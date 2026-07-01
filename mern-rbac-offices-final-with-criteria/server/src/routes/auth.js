
import express from 'express';
import jwt from 'jsonwebtoken';
import { demoUsers } from '../models/User.js';

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const found = demoUsers.find(u => u.username === username && u.password === password);
  if (!found) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username: found.username, role: found.role }, process.env.JWT_SECRET, { expiresIn: '8h' });
  res.json({
    token,
    user: { username: found.username, role: found.role, displayName: found.displayName }
  });
});

export default router;


const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Register (for testing)
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.create({ name, email, password, role });
    res.json({ ok: true, user: { id: user._id, email: user.email }});
  } catch (e) { res.status(400).json({ ok:false, error: e.message }); }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if(!user) return res.status(401).json({ ok:false, error: 'Invalid credentials' });
  const match = await user.comparePassword(password);
  if(!match) return res.status(401).json({ ok:false, error: 'Invalid credentials' });
  const token = jwt.sign({ id: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ ok:true, token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
});

module.exports = router;

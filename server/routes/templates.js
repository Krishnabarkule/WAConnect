
const express = require('express');
const Template = require('../models/Template');
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

function auth(req,res,next){
  const a = req.headers.authorization;
  if(!a) return res.status(401).json({ok:false});
  const token = a.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload; next();
  } catch(e){ return res.status(401).json({ok:false}); }
}

// Create template
router.post('/', auth, async (req,res) => {
  const { name, content } = req.body;
  const vars = [...new Set((content.match(/\{\s*([a-zA-Z0-9_]+)\s*\}/g)||[]).map(v=>v.replace(/[{}\s]/g,'')))];
  const t = await Template.create({ userId: req.user.id, name, content, variables: vars });
  res.json({ ok:true, template: t });
});

// List
router.get('/', auth, async (req,res) => {
  const list = await Template.find({ userId: req.user.id }).sort({createdAt:-1});
  res.json({ ok:true, templates: list });
});

module.exports = router;

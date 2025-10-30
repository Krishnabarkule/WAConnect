
const express = require('express');
const Job = require('../models/Job');
const MessageLog = require('../models/MessageLog');
const router = express.Router();
const jwt = require('jsonwebtoken');

function auth(req,res,next){
  const a = req.headers.authorization;
  if(!a) return res.status(401).json({ok:false});
  const token = a.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = payload; next();
  } catch(e){ return res.status(401).json({ok:false}); }
}

router.get('/:jobId/logs', auth, async (req,res) => {
  const logs = await MessageLog.find({ jobId: req.params.jobId }).limit(1000);
  res.json({ ok:true, logs });
});

module.exports = router;

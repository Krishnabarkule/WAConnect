
const express = require('express');
const multer = require('multer');
const Papa = require('papaparse');
const fs = require('fs');
const Job = require('../models/Job');
const Template = require('../models/Template');
const { sendBatch } = require('../utils/sendStub');
const { sendReportEmail } = require('../utils/emailService');
const jwt = require('jsonwebtoken');

const upload = multer({ dest: 'uploads/' });
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

// Upload CSV and create job (immediate send)
router.post('/upload', auth, upload.single('csv'), async (req,res) => {
  try {
    const csvPath = req.file.path;
    const csvText = fs.readFileSync(csvPath,'utf8');
    const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
    const rows = parsed.data.map(r => ({ name: r.name || r.Name || '', contact: (r.contact||r.Contact||'').replace(/[^0-9+]/g,'') }));
    // create job
    const job = await Job.create({ userId: req.user.id, csvName: req.file.originalname, status: 'running' });
    // fetch template if provided
    const template = req.body.templateId ? await Template.findById(req.body.templateId) : { content: req.body.message || 'Hi {name}' };
    // do send (stub) and emit via socket
    const io = req.app.get('io');
    const summary = await sendBatch({ job, contacts: rows, template, io });
    job.status = 'completed';
    job.summary = summary;
    await job.save();
    // send email report (simple)
    try {
      await sendReportEmail(req.user.email, 'WAConnect Report', `Your job ${job._id} completed. Sent: ${summary.sent}`);
    } catch(e){
      console.error('Email error', e.message);
    }
    res.json({ ok:true, job, summary });
  } catch(e){
    console.error(e);
    res.status(500).json({ ok:false, error: e.message });
  }
});

module.exports = router;

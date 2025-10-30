
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' },
  csvName: String,
  imageUrl: String,
  scheduleAt: Date,
  status: { type: String, enum: ['scheduled','running','completed','failed'], default: 'scheduled' },
  summary: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);

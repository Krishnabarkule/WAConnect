
const mongoose = require('mongoose');

const MessageLogSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contact: String,
  name: String,
  messageContent: String,
  status: { type: String, enum: ['queued','sending','sent','failed','delivered'], default: 'queued' },
  errorMessage: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MessageLog', MessageLogSchema);

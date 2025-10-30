
/**
 * sendStub simulates sending WhatsApp messages.
 * Replace with a real implementation (whatsapp-web.js or Twilio) when available.
 */

const MessageLog = require('../models/MessageLog');

async function sendBatch({ job, contacts, template, io }) {
  // Simulate sending with delays
  const total = contacts.length;
  let sent = 0, failed = 0;
  for (let i = 0; i < contacts.length; i++) {
    const row = contacts[i];
    const personalized = template.content.replace(/{\s*name\s*}/gi, row.name || '');
    // create log entry
    const log = await MessageLog.create({
      jobId: job._id,
      userId: job.userId,
      contact: row.contact,
      name: row.name,
      messageContent: personalized,
      status: 'sent'
    });
    sent++;
    // emit progress via socket.io
    if (io) {
      io.emit('job:progress', { jobId: job._id, total, sent, failed, current: row.contact });
    }
    // wait a bit to simulate rate limiting
    await new Promise(res => setTimeout(res, 250));
  }
  return { total, sent, failed };
}

module.exports = { sendBatch };

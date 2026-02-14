const mongoose = require('mongoose');

const TemplateSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  templateId: String,
  templateCode: String,
  fullHTML: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Template", TemplateSchema);

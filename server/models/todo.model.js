const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
  name: String,
  description: String,
  target_completion_date: Date,
  completion_date: Date
});

// Export the model
module.exports = mongoose.model('Todo', TodoSchema);
const mongoose = require('mongoose');

const WstgNodeSchema = new mongoose.Schema({});
WstgNodeSchema.add({
  id: {
    type: String,
    required: true,
    unique: true
  },
  label: {
    type: String,
    required: true
  },
  labelfa: {
    type: String
  },
  wstg: {
    type: String
  },
  children: [WstgNodeSchema] // Recursive reference to itself
});

const WstgModel = mongoose.model('WstgItem', WstgNodeSchema);

module.exports = WstgModel;
 
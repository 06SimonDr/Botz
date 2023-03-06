const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const suggestieSchema = new mongoose.Schema({
  _id: reqString,
  channelId: reqString
})

module.exports = mongoose.model('suggestie-schema', suggestieSchema)
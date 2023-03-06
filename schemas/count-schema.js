const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const reqNumber = {
  type: Number,
  required: true,
}

const countSchema = new mongoose.Schema({
  _id: reqString,
  channelId: reqString,
  nummer: reqNumber,
  lastUser: reqString,
})

module.exports = mongoose.model('count-schema', countSchema)
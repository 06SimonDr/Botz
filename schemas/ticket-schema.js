const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const ticketSchema = new mongoose.Schema({
  _id: reqString,
  messageId: reqString,
  supportRole: { type: Array, required: true },
  category: reqString,
})

module.exports = mongoose.model('ticket-schema', ticketSchema)
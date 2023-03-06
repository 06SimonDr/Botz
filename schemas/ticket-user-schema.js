const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const ticketUserSchema = new mongoose.Schema({
  // User ID
  userId: reqString,
  serverId: reqString,
  ticket: {
      type: Boolean,
      required: true,
  },
  ticketChannel: reqString,
  members: {
      type: Array,
      required: true
  },
  closedTickets: {
      type: Array,
      required: true
  },
  blacklisted: {
      type: Boolean,
      required: true,
  },
})

module.exports = mongoose.model('ticket-user-schema', ticketUserSchema)
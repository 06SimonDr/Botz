const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const giveawaySchema = new mongoose.Schema({
  guildId: reqString,
  messageId: reqString,
  winners: reqString,
  channelId: reqString,
  prize: reqString,
  createdOn: reqString,
  endsOn: { type: Number, required: true },
  duration: reqString,
})

module.exports = mongoose.model('giveaway-schema', giveawaySchema)
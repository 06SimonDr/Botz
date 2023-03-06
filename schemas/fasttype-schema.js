const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const fasttypeSchema = new mongoose.Schema({
    _id: reqString,
    points: { type: Number, required: true }
})

module.exports = mongoose.model('fasttype-schema', fasttypeSchema)
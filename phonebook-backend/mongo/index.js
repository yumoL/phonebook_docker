const mongoose = require('mongoose')
const Person = require('./models/Person')
const { MONGODB_URI } = require('../utils/config')

if (MONGODB_URI && !mongoose.connection.readyState) mongoose.connect(MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = {
  Person
}
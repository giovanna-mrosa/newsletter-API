const mongoose = require('mongoose')

const schema = mongoose.model('schema', {
  email: String,
})

module.exports = schema
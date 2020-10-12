const mongoose = require('mongoose');

const schema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true, unique: true }
})

module.exports = mongoose.model('users', schema);
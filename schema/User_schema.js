const mongoose = require('mongoose')

const user = mongoose.Schema({
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        require: true
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationOTP: {
        type: Number,
        default: null,
    }
})

module.exports = mongoose.model('user', user)
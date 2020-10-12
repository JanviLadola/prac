const mongoose = require('mongoose')

const profile = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    FirstName: {
        type: String,
        require: true
    },
    LastName: {
        type: String,
        require: true
    },
    Contact: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('profile', profile)
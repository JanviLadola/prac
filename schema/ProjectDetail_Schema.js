const mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;

const Project_Detail = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'users',
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    status: {
        type: Number,
        default: 1,
        enum: [1, 2, 3, 4], // 1:Pending, 2:Active, 3:Completed, 4:Deleted
    }
})

module.exports = mongoose.model('Project_Details', Project_Detail)
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const User_Project_Allocation = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'users',
        required: true,
    },
    projectId: {
        type: ObjectId,
        ref: 'Project_Details'
    },

})

module.exports = mongoose.model('User_Project_Allocations', User_Project_Allocation)
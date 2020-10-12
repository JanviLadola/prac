const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status')
const user = require('../../schema/User_schema'),
    project = require('../../schema/ProjectDetail_Schema');
const userProject = require('../../schema/User_Project_Allocation');
const ObjectId = mongoose.Types.ObjectId

module.exports = async(req, res) => {
    try {
        let { userId, projectId } = req.body
        if (userId == undefined || projectId == undefined) {
            console.log("Fields Missing 1.1");
            return res.status(200).json({
                data: [],
                message: "Fields missing 1.1 ",
                status: 400
            })
        }
        let isProjectExist = await project.findOne({ _id: ObjectId(projectId) })
        if (isProjectExist == null) {
            console.log("Project does not exist 1.2");
            return res.status(200).json({
                data: [],
                message: "Project dose not exist 1.2",
                status: 401
            })
        }
        let isUserExist = await user.findOne({ _id: ObjectId(userId) })
        if (isUserExist == null) {
            console.log("User does not exist 1.3");
            return res.status(200).json({
                data: [],
                message: "User not exist 1.3",
                status: 402
            })
        }
        let isAllocated = await project.findOne({ $and: [{ _id: ObjectId(projectId) }, { status: 2 }] })
        console.log(isAllocated);
        if (isAllocated != null) {
            console.log("Project Already Allocated 1.4");
            return res.status(200).json({
                data: isAllocated,
                message: "Project already allocated 1.4",
                status: 403
            })
        }
        let isDeleted = await project.findOne({ $and: [{ _id: ObjectId(projectId) }, { status: 4 }] })
        if (isDeleted != null) {
            console.log("Project has been deleted 1.5");
            return res.status(200).json({
                data: [],
                message: "Project has been deleted 1.5",
                status: 404
            })
        }
        let isCompleted = await project.findOne({ $and: [{ _id: ObjectId(projectId) }, { status: 3 }] })
        if (isCompleted != null) {
            console.log("Project has been completed 1.6");
            return res.status(200).json({
                data: [],
                message: "Project has been completed 1.6",
                status: 405
            })
        }
        let checkAllocation = await userProject.findOne({ $and: [{ userId }, { projectId }] })
            //console.log(checkAllocation);
        if (checkAllocation != null) {
            console.log(checkAllocation, " \n 1.7");
            return res.status(200).json({
                data: checkAllocation,
                message: "Project already allocated to this user 1.7",
                status: 406
            })
        }
        new userProject({
                userId: ObjectId(userId),
                projectId: ObjectId(projectId)
            }).save()
            .then(userProjectRes => {
                console.log("Allocated Successfully 1.8");
                return res.status(200).json({
                    status: 200,
                    message: "Project allocated successfully 1.8",
                    data: checkAllocation
                })
            }).catch(userProjectErr => {
                console.log(userProjectErr, " 1.9");
                return res.status(500).json({
                    data: [],
                    message: "Error while Allocation 1.9",
                    status: 500
                })
            })
    } catch (err) {
        console.log(err, " 1.10");
        return res.status(500).json({
            data: [],
            status: 500,
            message: "Error while Allocation 1.10",
        })
    }
}
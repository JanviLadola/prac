const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status');

const ObjectId = mongoose.Types.ObjectId
const user = require('../../schema/User_schema')
const project = require('../../schema/ProjectDetail_Schema')
module.exports = async(req, res) => {
    try {
        console.log("try");
        let { userId, title, description } = req.body
        if (userId == undefined || title == undefined || description == undefined) {
            console.log(200);
            return res.status(200).json({
                data: [],
                message: "Fields missing",
                status: 400,
            })
        }
        let isUserExist = await user.findOne({ _id: ObjectId(userId) })
        if (isUserExist == null) {
            console.log("User does not exist 1.1");
            return res.status(200).json({
                data: [],
                message: "User not exist 1.1",
                status: 402
            })
        }
        let getTitle = await project.findOne({ title })
        console.log(getTitle);
        if (getTitle != null) {
            console.log("Project already exist 1.2");
            return res.status(300).json({
                "status": 301,
                "message": "Project already exist 1.2",
                "data": getTitle,
            })
        }
        new project({
                userId,
                title,
                description
            }).save()
            .then(projectRes => {
                console.log("Project saved 1.3");
                return res.status(200).json({
                    "data": req.body,
                    "message": "Project Saved 1.3",
                    "status": 200,
                })
            }).catch(ProjectErr => {
                console.log("Error while saving project 1.4");
                return res.status(400).json({
                    "status": 401,
                    "message": "Error while saving project 1.4",
                    "data": [],
                })
            })
    } catch (err) {
        return res.status(500).json({
            data: [],
            status: 500,
            "message": "Error while saving project 1.5",
        })
    }

}
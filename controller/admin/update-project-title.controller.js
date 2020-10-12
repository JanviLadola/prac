const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status')

const project = require('../../schema/ProjectDetail_Schema'),
    ObjectId = mongoose.Types.ObjectId


module.exports = async(req, res) => {
    try {
        let projectId = req.body.projectId
        console.log(projectId);
        if (projectId == undefined) {
            console.log("project id required");
            return res.status(400).json({
                data: [],
                message: "Project Id missing",
                status: 401
            })
        }
        if (req.body.title != null) {
            let title = req.body.title
            let isTitleUpdate = await project.findOneAndUpdate({
                _id: ObjectId(projectId)
            }, {
                title: title
            })
            if (isTitleUpdate != null) {
                console.log("Title Updated");
                return res.status(200).json({
                    data: isTitleUpdate,
                    message: "Title updated successfully",
                    status: 201
                })
            }
        }
        if (req.body.description != null) {
            let description = req.body.description
            let idDescriptionUpdated = await project.findOneAndUpdate({
                _id: ObjectId(projectId)
            }, {
                description: description
            })
            if (idDescriptionUpdated != null) {
                console.log("description Updated");
                return res.status(200).json({
                    data: idDescriptionUpdated,
                    message: "description updated successfully",
                    status: 201
                })
            }
        }
    } catch (err) {
        console.log("Error while updating project detail 2");
        return res.status(500).json({
            data: [],
            message: "Error while updating project detail",
            status: 500
        })
    }
}
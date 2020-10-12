const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status')

const project = require('../../schema/ProjectDetail_Schema'),
    ObjectId = mongoose.Types.ObjectId

module.exports = async(req, res) => {
    try {
        let { projectId, status } = req.body;
        console.log(projectId);
        console.log(status);
        if (projectId == undefined) {
            console.log("id missing 1.1");
            return res.status(400).json({
                data: [],
                message: "id missing",
                status: 401
            })
        }
        if (status == undefined) {
            console.log("status missing 1.1");
            return res.status(400).json({
                data: [],
                message: "status missing",
                status: 401
            })
        }
        let isUpdate = await project.findOneAndUpdate({
            _id: ObjectId(projectId)
        }, {
            status: status
        });
        console.log("status updated successfully 1.3");
        if (isUpdate != null) {
            return res.status(200).json({
                data: isUpdate,
                message: "status updated successfully",
                status: 200
            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            data: [],
            message: "error while updating status",
            status: 500
        })
    }
}
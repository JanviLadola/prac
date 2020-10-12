const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status'),
    moment = require('moment')

const ObjectId = mongoose.Types.ObjectId;

const user = require('../../schema/User_schema'),
    project = require('../../schema/ProjectDetail_Schema'),
    userProject = require('../../schema/User_Project_Allocation')

module.exports = async(req, res) => {
    let { userId } = req.body;
    console.log(userId);
    await user.aggregate([{
        $lookup: {
            from: "project_details",
            localField: "_id",
            foreignField: "userId",
            as: "Allocations"
        }
    }, {
        $match: { "_id": ObjectId(userId) }
    }, ]).then(async result => {
        console.log(result);

        const data = await result[0].Allocations.map(item => {
            item["date"] = moment().format('LLLL')
            console.log(item);
        })
        return res.status(200).json({
            data: result,
            message: "Particular user projects",
            status: 200
        })
    }).catch(async error => {
        console.log(error);
        return res.status(500).json({
            data: [],
            message: "error while fetching data",
            status: 501
        })
    })
}
const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status'),
    moment = require('moment')

const user = require('../../schema/User_schema')
module.exports = async(req, res) => {
    await user.aggregate([{
        $lookup: {
            from: "project_details",
            localField: "_id",
            foreignField: "userId",
            as: "Allocations"
        }
    }]).then(async result => {
        console.log(result);
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
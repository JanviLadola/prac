const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status')

const user = require('../../schema/User_schema'),
    profile = require('../../schema/Profile_schema')

module.exports = async(req, res) => {
    await user.aggregate([{
        $lookup: {
            from: "profile",
            localField: "_id",
            foreignField: "userId",
            as: "ID"
        }
    }]).then(result => {
        console.log(result);
        return res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    })
}
const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status')

const user = require('./schema/User_schema');
const profile = require('./schema/Profile_schema');

module.exports = async(req, res) => {
    let { Email, Password, FirstName, LastName, Contact } = req.body

    let getUser = await user.findOne({ Email })

    console.log(getUser, "1.1");
    // if (getUser != null) {
    //     return res.status(409).json({
    //         "data": getUser,
    //         "message": "already"
    //     });
    // }
    // if (getUser != null) {
    //     return res.status(409).json({
    //         "data": getUser,
    //         "message": "already"
    //     });
    // }
    console.log(Email);
    console.log(Password);
    await new user({
            Email: Email,
            Password
        }).save()
        .then(async result => {
            await new profile({
                    userId: result._id,
                    FirstName,
                    LastName,
                    Contact
                }).save()
                .then(profileRes => {
                    console.log("Profile OK");
                    return res.sendStatus(200);
                }).catch(ProfileErr => {
                    console.log("error while creating profile");
                    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
                })
        })
        .catch(error => {
            console.log(error);
            return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
        })
}
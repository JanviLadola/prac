const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status')

const ObjectId = mongoose.Types.ObjectId;
const user = require('../../schema/User_schema')
module.exports = async(req, res) => {

    try {
        let { userOTP, Id } = req.body;
        if (userOTP == undefined || Id == undefined) {
            return res.status(200).json({
                status: 400,
                message: "fields missing 1.1",
                data: []
            })
        }
        const isUserExist = await user.findOne({
            _id: mongoose.Types.ObjectId(Id),
        });

        if (isUserExist == null) {
            console.log("User not Exist");
            return res.status(400).json({
                data: [],
                message: "User does not exist",
                status: 400
            });
        } else {
            if (isUserExist.verified == true) {
                return res.status(200).json({
                    status: 201,
                    message: "User already verified 1.2",
                    data: isUserExist
                })
            }
            if (isUserExist.verificationOTP == null) {
                return res.status(200).json({
                    data: [],
                    message: "null verification OTP",
                    status: 202,
                })
            }
            if (parseInt(isUserExist.verificationOTP) == parseInt(userOTP)) {
                let sentOTP = await user.findOneAndUpdate({
                    _id: ObjectId(Id),
                }, {
                    verified: true,
                    verificationOTP: null
                });
                console.log("sent otp  1.3", sentOTP);
                if (sentOTP != null) {
                    console.log("Verified Successfully..");
                    return res.sendStatus(200);
                }
            }

        }
    } catch (err) {
        return res.status(500).json({
            data: [],
            message: "Server Loss",
            status: 500
        })
    }
}
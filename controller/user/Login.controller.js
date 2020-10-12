const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status'),
    nodeMailer = require('nodemailer'),
    otpGenerator = require('otp-generator'),
    session = require('express-session')

const user = require('../../schema/User_schema')
module.exports = async(req, res) => {
    try {
        let { email, password } = req.body
        if (email == undefined || password == undefined) {
            return res.status(200).json({
                status: 400,
                message: "Fields missing",
                data: []
            })
        }
        let getUser = await user.findOne({ $and: [{ Email: email }, { Password: password }] })

        if (getUser == null) {
            console.log("Invalid Credentials..");
            return res.sendStatus(400);
        }
        let OTP = otpGenerator.generate(6, { alphabets: false, specialChars: false, upperCase: false })
        let testAccouhnt = await nodeMailer.createTestAccount();

        let transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: "janvi.semicolon@gmail.com",
                pass: "ktecnoqttxgqtnlq",
            }
        });

        let mailOption = {
            from: 'janvi.semicolon@gmail.com',
            to: 'janviladola99@gmail.com',
            subject: 'Verification OTP',
            text: OTP,
        };

        transporter.sendMail(mailOption, async function(err, info) {
            if (err) {
                console.log(err);
                return res.sendStatus(400);
            }
            console.log("Mail sent to:" + email);
            user.update({
                Email: email,
            }, {
                VerificationOTP: OTP,
            }, { upsert: true })

        })
    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "server loss",
            data: []
        })
    }
}
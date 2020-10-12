const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status')

// DB Schema
const users = require('../../schema/userSchema');

module.exports = (req, res) => {
    new users({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        }).save()
        .then(result => {
            console.log(200);
            return res.status(httpStatus.OK).json(result)
        })
        .catch(err => {
            console.log(300);
            console.log(err);
            return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
        })

    console.log(100);
    // return res.sendStatus(httpStatus.OK)
}
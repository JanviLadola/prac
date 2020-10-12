const express = require('express'),
    httpStatus = require('http-status')

module.exports = (req, res) => {
    return res.status(httpStatus.OK).json({
        response: "required",
        userName: "Janvi",
        email: "janvi.semicolon@gmail.com",
        verified: true
    })
}
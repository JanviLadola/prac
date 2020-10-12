const express = require('express'),
    mongoose = require('mongoose'),
    httpStatus = require('http-status')
module.exports = async(req, res) => {
    try {

    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: "Server Loss",
            data: []
        })
    }
}
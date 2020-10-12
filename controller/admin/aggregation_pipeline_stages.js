const express = require('express')
const httpStatus = require('http-status')
const Mongoose = require('mongoose')


const users = require('../../schema/User_schema')
project = require('../../schema/ProjectDetail_Schema')

module.exports = async(req, res) => {
    try {
        await project.aggregate([{

            $addFields: {
                "FirstName.userName": "JNV"
            }
        }]).then(result => {
            console.log(result);
            return res.status(200).json({
                data: result,
                message: "Data got",
                status: 200
            })
        }).catch(error => {
            console.log(error);
            return res.status(400).json({
                data: [],
                message: "Didn't get data",
                status: 401
            })
        })

    } catch (err) {
        console.log("error in catch");
        return res.status(500).json({
            data: [],
            message: "Error:inside the catch",
            status: 500
        })
    }

}
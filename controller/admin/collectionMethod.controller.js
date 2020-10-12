const express = require('express'),
    httpStatus = require('http-status'),
    mongoose = require('mongoose');
const { db } = require('../../schema/userSchema');

const users = require('../../schema/userSchema');

const ObjectId = mongoose.Types.ObjectId;
module.exports = (req, res) => {

    //          UPDATE-ONE
    // var query = { first_name: "XYZ" }
    // var newQuery = { $set: { last_name: "JNV" } };
    // db.collection("users").updateOne(query, newQuery, function(err, res) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log("1 doc updated..")
    //     }
    // });



    //          FIND-ONE

    // db.collection("users").findOne({}, function(err, res) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(res.first_name);
    //     }
    // });


    //          FIND-ALL

    // db.collection("users").find({ first_name: "XYZ" }).toArray(function(err, res) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(res);
    //     }
    // });



    //          FIND-ONE & UPDATE

    // var query = { first_name: "XYZ" }
    // var newQuery = { $set: { email: "ABC@gmail.com" } }
    // db.collection("users").findOneAndUpdate(query, newQuery, function(err, res) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(res);
    //     }
    // });



    //          UPDATE-ALL
    // var query = { first_name: /^J/ }
    // var newQuery = { $set: { email: "JR@gmail.com" } }
    // db.collection("users").updateMany(query, newQuery, function(err, res) {
    //     if (err) { console.log(err); } else { console.log("updated"); }
    // });


    //          
    let { last_name, first_name, UserId } = req.body
    console.log(last_name, first_name, UserId);
    let userUpdate = users.findOneAndUpdate({ _id: ObjectId(UserId) }, { last_name, first_name }).then(result => {
            console.log(200);
            return res.status(httpStatus.OK).json(result)
        })
        .catch(err => {
            console.log(300);
            console.log(err);
            return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
        })
}
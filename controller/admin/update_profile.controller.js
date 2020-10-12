const express = require('express')

module.exports = (req, res) => {
    console.log(req.body);
    console.log(req.files);

    return res.status(200).json(req.body);
}
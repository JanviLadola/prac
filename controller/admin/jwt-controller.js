const express = require('express'),
    jwt = require('jsonwebtoken')
module.exports = async(req, res) => {
    const token = jwt.create(claims, 'top-secret-phrase')
}
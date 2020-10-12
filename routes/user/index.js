const express = require('express'),
    UserApi = express()

const RegistrationController = require('../../controller/user/User-Registration.controller')
const LoginController = require('../../controller/user/Login.controller')
const LookUpController = require('../../controller/user/lookup-controller')
const VerificationController = require('../../controller/user/Verification.controller')

UserApi.post('/login', LoginController)
UserApi.post('/registration', RegistrationController)
UserApi.get('/lookUp', LookUpController)
UserApi.post('/verify', VerificationController)

module.exports = UserApi;
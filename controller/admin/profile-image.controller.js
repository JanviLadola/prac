const express = require('express'),
    fs = require('fs'),
    httpStatus = require('http-status');

module.exports.upload = (req, res) => {
    const file = req.files.image

    switch (file.mimetype) {
        case 'image/png':
            var filename = new Date().getTime() + '.png';
            break;
        case 'image/jpeg':
            var filename = new Date().getTime() + '.jpg';
            break;

        default:
            return res.sendStatus(httpStatus.BAD_REQUEST)
    }

    file.mv(process.cwd() + '/uploads/' + filename);

    return res.sendStatus(httpStatus.OK)
}

module.exports.remove = (req, res) => {

    // query
    // const queryFile = req.query.filename

    // params
    const filename = req.params.filename
    console.log(filename);

    if (fs.existsSync(process.cwd() + '/uploads/' + filename)) {
        // fs.unlinkSync(process.cwd() + '/uploads/' + filename, (error) => {
        //     if (error) { console.log(error) }
        // })
    }

    fs.lstat(process.cwd() + '/uploads/' + filename, (err, stat) => {
        console.log(stat);
    })


    return res.sendStatus(httpStatus.OK)
}
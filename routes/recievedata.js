var express = require('express');
var router = express.Router();

function processData(req) {
    let sendValue
    if(req && req.data) {
        sendValue = req.data
    } else {
        sendValue = req
        console.log('inside else in processData')
    }
    return sendValue
}

router.post('/', function(req, res, next) {
    console.log('/recievedata endpoint hit with GET request')
    let sendValue
    try {
        sendValue = processData(req)
    } catch (err) {
        sendValue = err
    }
    res.send(sendValue)
});

module.exports = router;

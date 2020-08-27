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

let showVal = {}
router.get('/', function(req, res, next) {
    console.log('/recievedata endpoint hit with POST request')
    res.send(showVal)
})
router.post('/', function(req, res, next) {
    console.log('/recievedata endpoint hit with POST request')
    let sendValue
    try {
        sendValue = processData(req)
    } catch (err) {
        sendValue = err
    }
    showVal.push(sendValue)
    res.send(sendValue)
});

module.exports = router;

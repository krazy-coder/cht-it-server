var express = require('express');
const qs = require('querystring')
var router = express.Router();

const pushToQuesJSON = function(obj) {
    let objk = Object.values(qstn)
    objk.push(obj)
    qstn = {...qstn} 
} 
let showVal = []
let qstn = require('../utils/question.json');
router.get('/', function(req, res, next) {
    console.log('/recievedata endpoint hit with GET request')
    // console.log(req.query)
    // console.log(Object.keys(qstn).length)
    res.send(qstn)
    
})
router.post('/', function(req, res, next) {
    console.log('/recievedata endpoint hit with POST request')
    let sendValue
    if(req && req.body) {
        sendValue = req.body
        pushToQuesJSON(sendValue)
        
        // console.log(req.headers)
        return res.status(200).json(sendValue)
    } else {
        console.log('some error')
        console.log(req.body)
        return res.status(500).json({ error: req })
    }
    //res.write(sendValue)
});

module.exports = router;

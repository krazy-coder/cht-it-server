const express = require('express')
const axios = require('axios')
const router = express.Router();

const getData = async function() {
    return new Promise((resolve, reject) => {
        axios.get('http://ec2-18-221-172-213.us-east-2.compute.amazonaws.com/livedata')
            .then(response => {
                // resolve(response.status)
                if(response && response.status != 200) {
                    // console.log('question.json response status = ' , response.status)
                    reject(response)
                } else {
                    // console.log('question.json response status = ' , response.status)
                    // console.log(response.data)
                    resolve(response.data)
                }
            })
            .catch( e => {
                reject(e)
            })
    })
}

router.get('/', function(req, res, next) {
    let sendData = {}
    console.log('/livestats GET hit')
    getData().then(response => {
        sendData = response
        //console.log(response)
        res.send(sendData)
    }).catch(err => console.error(err))
    
} )

module.exports = router;
const express = require('express')
const axios = require('axios')
const router = express.Router();

const getData = async function() {
    const questions = new Promise((resolve, reject) => {
        axios.get('http://trial-env.eba-yqrzfvys.us-east-2.elasticbeanstalk.com/livedata')
            .then(response => {
                // resolve(response.status)
                if(response && response.status != 200) {
                    // console.log('question.json response status = ' , response.status)
                    reject(response)
                } else {
                    // console.log('question.json response status = ' , response.status)
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
    getData().then(response => {sendData = response}).catch(err => console.error(err))
    res.send(sendData)
} )

module.exports = router;
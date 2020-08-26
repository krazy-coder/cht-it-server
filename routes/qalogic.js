const express = require('express')
const axios = require('axios')
const router = express.Router();

const getData = async function() {
    const questions = new Promise((resolve, reject) => {
        axios.get('https://cheat-it.firebaseio.com/question.json')
            .then(response => {
                // resolve(response.status)
                if(response && response.status != 200) {
                    console.log('question.json response status = ' , response.status)
                    reject(response)
                } else {
                    console.log('question.json response status = ' , response.status)
                    resolve(response.data)
                }
            })
            .catch( e => {
                reject(e)
            })
    })

    const answers = new Promise((resolve, reject) => {
        axios.get('https://cheat-it.firebaseio.com/answers.json')
        .then(response => {
            // resolve(response.status)
            if(response && response.status != 200) {
                console.log('amswers.json response status = ' , response.status)
                reject(response)
            } else {
                console.log('answers.json response status = ' , response.status)
                resolve(response.data)
            }
        })
        .catch( e => {
            reject(e)
        })
    })

    return new Promise((resolve, reject) => {
        Promise.all([questions, answers])
            .then(values =>{ return resolve(values)})
            .catch(error => {
                // console.error(error)
                reject(error)
            })

    })
}

const parseDataMeaningfully = function(questions, answers) {
    let data = []
    let ans = null
    questions.map(q_element => {
        ans = '--'
        let t_id = q_element.id.split("_")
        temp = {
            'name': t_id[1],
            'question': q_element.question,
            'answer': null,
            'id' : q_element.id
        }
        //console.log(t_id)
        answers.forEach(a_element => {
            if(a_element.id == q_element.id)
                ans = a_element.answer
        });
        temp.answer = ans
        data.push(temp)
    })
    return data
}
var dynamic_data = []

router.get('/' , function(req, res, next) {
    console.log('get request on /qalogic endpoint')
    var existing_question = []
    var existing_answer = []
    var data = []
    getData()
        .then(values => {
           // console.log(values)
            //res.send(values)
            existing_question = Object.values(values[0])
            existing_answer = Object.values(values[1])
            dynamic_data = parseDataMeaningfully(existing_question, existing_answer)
            data = dynamic_data
            // console.log(data)
            res.send(data)
        })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})

const sendCompleteData = async function (){
    let data1 = []
    var existing_question = []
    var existing_answer = []
    return new Promise((resolve, reject) => {
        getData()
            .then(values => {
                existing_question = Object.values(values[0])
                existing_answer = Object.values(values[1])
                data1 = parseDataMeaningfully(existing_question, existing_answer)
                return resolve(data1)
            })
            .catch(error => {
                console.log(error)
                res.send(error)
                reject(error)
            })
    })
}

router.get('/prakhar' , function(req, res, next) {
    console.log('get request on /qalogic/prakhar endpoint')
    sendCompleteData()
        .then(recieved_data => {
            res.send(recieved_data)
        })
        .catch(err => {
            console.error(err)
            res.send(err)
        })
})

module.exports = router;
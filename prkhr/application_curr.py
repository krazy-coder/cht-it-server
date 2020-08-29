from flask import Flask
from flask_restful import Resource,Api
import requests
import pyrebase
#import firebase_admin
#from firebase_admin import credentials, firestore, storage
import json



application=app=Flask(__name__)
api=Api(app)

config ={
  
    "apiKey": "AIzaSyAg56yo99FbC1x8dS_HJNGwe9FRT3sAjkw",
    "authDomain": "cheat-it.firebaseapp.com",
    "databaseURL": "https://cheat-it.firebaseio.com/",
    "projectId": "cheat-it",
    "storageBucket": "cheat-it.appspot.com",
    "messagingSenderId": "377142010184",
    "appId": "1:377142010184:web:80f417b32fafe72831937d",
    "measurementId": "G-MXV4RDB16S"
}

firebase=pyrebase.initialize_app(config)
db=firebase.database()




class pushingdata(Resource) :
    def get(self) :
        return data


class livedata(Resource) :
    def get(self) :
        questions=db.child("question").get()
        answers=db.child("answers").get()
        cont=questions.val()
        # print(cont)
        cont2=answers.val()
        y=list(cont2.values())
        # data=list()
        ##
        ##
        ##  Main algorithm behind the merging 

        question=dict()
        for x in cont :
           
            # questions=data.val()
            if cont[x]['question'] not in question :
                answers = dict()
            if cont[x]['question'] in question:
                answers =  question[cont[x]['question']]
            for z in y:
                if z['id'] == cont[x]['id']:
                    if z['answer'] not in answers :
                        answers[ z['answer']]=1
                    elif z['answer'] in answers :
                        answers[z['answer']]+=1


            d=cont[x]['question']
            

            question[d]=answers

        # for x in question :
        #   try:
                
        #       db.child("try_1").child("cs-img-pro").child(x).set(question[x])
        #   except :
        #       pass
        ###
        ###
        ##  pushing data to the data base 
        ##
        ###
        data=dict()
        i=0
        for x in question :
            packet=dict()
            packet["question"]=x
            packet["answer"]=question[x]
            try :
                data[i]=packet
                i=i+1
            except :
                pass
            # try :
            #     db.child("live").child(i).set(packet)
            #     i=i+1
            # except :
            #     pass

        return data


api.add_resource(livedata,'/livedata')


if __name__=='__main__' :
    app.run(debug=True)        
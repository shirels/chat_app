const express = require('express')

const router = express.Router()
const {users} = require('../db/users')

// users = {@username: { messages: {@sendername:[list of msg str]}}} ==> @changable

//get messages - GET command
//retrieving the messages for the recipient inclued in the request body
router.get('/',(req,res)=>{
    const {recipient} = req.body
    if(users[recipient]){
        res.status(200).send({msgs:users[recipient].messages})
        console.log({msgs:users[recipient].messages})
    }
    else{
        res.status(400).send({err: "Sorry, you are not in the system"})
        console.log({err: "Sorry, you are not in the system"})
    } 
})

//send messages - POST command
//send a message to another using the data inclueded in the request body
router.post('/',(req,res)=>{
    const {sender, recipient, message} = req.body
    try{
        if(!users[sender]){//if sender not in db
            users[sender] = {messages:{}}
        }
        if(!users[recipient]){//if recipient not in db
            users[recipient] = {messages: {}}
            users[recipient]['messages'][sender] = [message]
        }else{//if sender hasn't send a message to this recipient yet
            if(users[recipient]['messages'][sender]){
                users[recipient]['messages'][sender].push(message)
            }else{
                users[recipient]['messages'][sender] = [message]
            }
        }
        res.status(200).send({msg:`The message: "${message}" was sent to ${recipient}`}) 
        console.log({msg:`The message: "${message}" was sent to ${recipient}`}) 
    }catch(err){
        res.status(400).send({err: err.message})
        console.log({err: err.message})
    }
})

module.exports = router
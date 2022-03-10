//imports
const fs = require('fs/promises')
const express = require('express')
const { users } = require('./db/users')

//initiating server instance
const app = express()

//using midlware for using the request body - including message parameter(JSON)
app.use(express.json())

//midleware for monitoring the server traffic
app.use(async (req,res, next)=>{
    if(req.method == 'GET'){
        const {recipient} = req.body
        await fs.appendFile('monitor.log', `${new Date().toISOString()} || ${req.method} - ${recipient}\n`)
    }else{
        const {recipient, sender} = req.body
        await fs.appendFile('monitor.log', `${new Date().toISOString()} || ${req.method} - ${sender} => ${recipient}\n`)
    }
    next()
})

//rout for GET request 
//retrieving the messages for the recipient inclued in the request body
app.get('/api/', (req,res)=>{
    const {recipient} = req.body
    const user = users.find(u=>u.username==recipient)
    if(user){
        res.status(200).send({msgs:user.messages})
    }
    else{
        res.status(400).send({err: "Sorry, your details are not in the system"})
    }   
})

//rout for POST request with data inclueded in the request body
//sending a message to another person
app.post('/api/', (req,res)=>{
    const {sender, recipient, message} = req.body
    try{//if sender not in db
        if(!users.some(u=>u.username == sender)){
            users.push(
                {
                    username: sender,
                    messages: []
                }
            )
        }
        if(!users.some(u=>u.username == recipient)){//if recipient not in db
            users.push(
                {
                    username: recipient,
                    messages:[
                        {
                            sender: sender,
                            msg: [message]
                        }
                    ]

                }
            )
        }else{
            const rec_user = users.find(u=>u.username==recipient)
            const rec_msgs = rec_user.messages
            //if sender hasn't send a message to this recipient yet
            if(rec_msgs.some(m=>m.sender == sender)){
                const s_msg = rec_msgs.find(m=>m.sender == sender)
                s_msg.msg.push(message)
            }else{
                rec_msgs.push(
                    {
                        sender,
                        msg: [message]
                    }
                )
            }
        }
        res.status(200).send({msg:`The message: "${message}" was sent to ${recipient}`}) 
    }catch(err){
        res.status(400).send({err: err.message})
    }
})


//activating server
app.listen(1000,()=>{
    console.log("server is up and running on port 1000...")
})
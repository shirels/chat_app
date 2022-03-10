//imports
const fs = require('fs/promises')
const express = require('express')
const { users } = require('./db/users')

//initiating server instance
const app = express()

//using midlware for using the request body
app.use(express.json())
//midleware for logging the activity
app.use(async (req,res, next)=>{
    await fs.appendFile('monitor.log', `${new Date().toISOString()} || ${req.method} - ${req.url}\n`)
    next()
})


app.get('/', (req,res)=>{
    const {recipient} = req.body
    // console.log(recipient)
    const user = users.find(u=>u.username==recipient)
    // console.log(user)
    // console.log(users)
    if(user){
        res.status(200).send({msgs:user.messages})
    }
    else{
        res.status(400).send({err: "Sorry, your details are not in the system"})
    }
    
})

app.post('/', (req,res)=>{
    const sender = req.body.sender
    //console.log(sender)
    const recipient = req.body.recipient
    //console.log(recipient)
    try{
        if(!users.some(u=>u.username == sender)){
            users.push(
                {
                    username: sender,
                    messages: []
                }
            )
            //console.log(users)
        }
        if(!users.some(u=>u.username == recipient)){
            users.push(
                {
                    username: recipient,
                    messages:[req.body.message]
                }
            )
            //console.log(users)
        }else{
            const user = users.find(u=>u.username==recipient)
            user.messages.push(req.body.message)
            //console.log(user)
        }
        //console.log(users)
        res.status(200).send({msg:`The message: "${req.body.message}" was sent to ${recipient}`}) 
    }catch(err){
        res.status(400).send({err: err})
    }
})


//activating server
app.listen(1000,()=>{
    console.log("server is up and running on port 1000...")
})
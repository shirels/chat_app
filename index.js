//imports
const express = require('express')
const { users } = require('./db/users')
const { validRequest } = require('./helpers/validators')
const { monitor } = require('./helpers/monitor')


//initiating server instance - i.e express app
const app = express()

//using midlware for using the request body - including message parameter(JSON)
app.use(express.json())
//midleware check for correct request
app.use(validRequest)
//midleware for monitoring the server traffic
app.use(monitor)

app.use('/api/users', require('./routs/msgService'))


//activating server
app.listen(1000,()=>{
    console.log("server is up and running on port 1000...")
})
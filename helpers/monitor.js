const fs = require('fs/promises')

module.exports.monitor = async function(req,res,next){
    if(req.method == 'GET'){
        const {recipient} = req.body
        await fs.appendFile('monitor.log', `${new Date().toISOString()} || ${req.method} - ${recipient}\n`)
    }else{
        const {recipient, sender} = req.body
        await fs.appendFile('monitor.log', `${new Date().toISOString()} || ${req.method} - ${sender} => ${recipient}\n`)
    }
    next()
}
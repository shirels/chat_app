
module.exports.validRequest = function (req,res,next){

    if(req.method == 'GET'){
        if(req.body.recipient){
            next()
        }else{
            res.status(400).send({err: "recipient name is mising"})
            console.log({err: "recipient name is mising"})
        }
    }else if(req.method == 'POST'){
        const {recipient, sender, message} = req.body
        if(recipient && sender && message){
            next()
        }else{
            res.status(400).send({err: "information is missing, pls send message correctly"})
            console.log({err: "information is missing, pls send message correctly"})
        }
    }else{
        res.status(400).send({err: "the service only suppurt GET & POST for the moment.."})
        console.log({err: "the service only suppurt GET & POST for the moment.."})
    }
}
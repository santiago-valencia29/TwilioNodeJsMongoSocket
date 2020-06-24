const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { sendMessage } = require('../twilio/send-sms');
const SMS = require('../models/sms')

const indexController = async (req, res) => {
    const messages = await SMS.find().lean(); //lean convierte a json
    // messages.forEach(m => console.log(m.Body));
    res.render('index', { messages }) //llama el motor de plantilla

}

const postMessage = async (req, res) => {
    // console.log(req.body);
    const { message, phone } = req.body;

    if (!message || !phone) return res.json('Missing message or phone');

    const result = await sendMessage(req.body.message, req.body.phone);

    await SMS.create({ Body: req.body.message, To: req.body.phone })

    console.log(result.sid);
    // res.send('received');

    res.redirect('/');
}

const receiveMessage = async (req, res) => {
 console.log(req.body);

 const savedSMS = await SMS.create({
     Body:req.body.Body,
     From:req.body.From
 })

 const twiml = new MessagingResponse();

 twiml.message('This is my response');
 res.send(twiml.toString());
}

module.exports = {
    indexController,
    postMessage,
    receiveMessage
}
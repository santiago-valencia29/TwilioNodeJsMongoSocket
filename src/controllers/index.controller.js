const MessagingResponse = require('twilio').twiml.MessagingResponse;
const { sendMessage, phoneVerify } = require('../twilio/send-sms');
const SMS = require('../models/sms');

const { getSocket } = require('../sockets');

const indexController = async (req, res) => {
    const messages = await SMS.find().sort('-createdAt').lean(); //lean convierte a json
    // messages.forEach(m => console.log(m.Body));
    res.render('index', { messages }) //llama el motor de plantilla

}

const postMessage = async (req, res) => {
    // console.log(req.body);
    const { message, phone } = req.body;

    if (!message || !phone) return res.json('Missing message or phone');

    const verify = await phoneVerify(req.body.phone);
    if (verify === 404) {
        res.status(404).json({ messages: 'not found phone' });
    } else {
        const result = await sendMessage(req.body.message, req.body.phone);

        await SMS.create({ Body: req.body.message, To: req.body.phone });

        console.log(result.sid, verify);

        // res.send('received'); --comentado
        res.redirect('/');
    }
}

const receiveMessage = async (req, res) => {
    console.log(req.body);

    const savedSMS = await SMS.create({
        Body: req.body.Body,
        From: req.body.From
    })

    getSocket().emit('new message', savedSMS);

    const twiml = new MessagingResponse();

    twiml.message('This is my response');
    res.send(twiml.toString());
}

module.exports = {
    indexController,
    postMessage,
    receiveMessage
}
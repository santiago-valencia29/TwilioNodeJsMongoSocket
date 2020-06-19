const { Router } = require('express');
const router = Router();
const { sendMessage } = require('../twilio/send-sms');
const SMS = require('../models/sms')

router.get('/', async (req, res) => {
    const messages = await SMS.find().lean(); //lean convierte a json
    // messages.forEach(m => console.log(m.Body));
    res.render('index',{messages}) //llama el motor de plantilla
});

router.post('/send-sms', async (req, res) => {
    // console.log(req.body);
    const result = await sendMessage(req.body.message, req.body.phone);

    await SMS.create({Body:req.body.message, To:req.body.phone})

    console.log(result.sid);
    // res.send('received');

    res.redirect('/');
});

module.exports = router;
const { Router } = require('express');

 const router = Router();

 const{sendMessage} = require('../twilio/send-sms');

 router.get('/',(req,res)=>{
     res.render('index') //llama el motor de plantilla
 });

 router.post('/send-sms',async (req, res)=>{
    console.log(req.body);
    const response = await sendMessage(req.body.message, req.body.phone);
    console.log(response.sid);
    res.send('received');
 });

 module.exports = router;
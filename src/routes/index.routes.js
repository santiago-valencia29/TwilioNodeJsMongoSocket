const { Router } = require('express');
const router = Router();
const { indexController, postMessage, receiveMessage} = require('../controllers/index.controller');

//ruta principal
router.get('/', indexController);

//ruta que nos permite enviar sms
router.post('/send-sms', postMessage);

//ruta para recibir sms
router.post('/sms', receiveMessage);

module.exports = router;
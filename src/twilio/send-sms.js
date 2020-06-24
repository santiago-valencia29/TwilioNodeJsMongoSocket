const config = require('../config');
const client = require('twilio')(config.accountSid, config.authToken);

// const client = require('twilio')('ACe9a724b6a2d770fee46452ff89143a50', '3c668ed55a9332c26d15f8dd4fe942e2');
/**
 * Send an SMS message
 * @param {string} body - the sms message
 * @param {string} phone - the phone number
 */


async function sendMessage(body, phone) {
    try {
        const message = await client.messages.create({ //proccess asyncrono
            to: phone,
            from: '+12018093937',
            body
        })
        // console.log(message.sid)
        return message;

    } catch (err) {
        // console.log(error);
        const error = err.status;
        return error;
    }
    // console.log('message sended')
}

/**
 * 
 * @param {string} phone - the phone number
 */

async function phoneVerify(phone) {
    try {
        const verify = await client.lookups.phoneNumbers(phone).fetch({ type: ['carrier'] })
        return verify;

    } catch (err) {
        const error = err.status;
        return error;
    }
}

module.exports = { sendMessage, phoneVerify };




















// prueba inicial

// async function sendMessage() {
//     try {
//         const message = await client.messages.create({ //proccess asyncrono
//             to: config.phone,
//             from: '+12018093937',
//             body: 'my second message'
//         })
//         console.log(message.sid)

//     } catch (error) {
//         console.log(error)
//     }
//     // console.log('message sended')
// }

// sendMessage();
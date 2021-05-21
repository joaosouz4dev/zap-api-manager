const functions = require('../controllers/functions')
const superagent = require('superagent');
require('superagent-queue');

module.exports = class Webhooks {

    static async wh_messages(session, response) {
        let data = functions.getUser(session)
        try {

            await superagent
                .post(data.wh_message)
                .send(response)
                .queue('messages')
                .end(function () {
                    console.log('webhooks receive message....')
                });


        } catch (error) {
            console.log(error)
        }
    }

    static async wh_connect(session, response, number = null, browserless = null, tokens = []) {
        let data = functions.getUser(session)
        if (response == 'autocloseCalled' || response == 'desconnectedMobile') {
            functions.deleteSession(session)
        }
        try {
            if (response == 'qrReadSuccess' || response == 'connected') {
                var object = {
                    "wook": 'STATUS_CONNECT',
                    'result': 200,
                    'session': session,
                    'status': response,
                    'number': number,
                    'browserless': browserless,
                    'tokens': tokens
                }
            } else {

                var object = {
                    "wook": 'STATUS_CONNECT',
                    'result': 200,
                    'session': session,
                    'status': response
                }
            }

            await superagent
                .post(data.wh_connect)
                .send(object)
                .queue('connection')
                .end(function () {
                    console.log('webhooks connect status....')
                });

        } catch (error) {
            console.log('Url no defined')
        }


    }

    static async wh_status(session, response) {
        let data = functions.getUser(session)
        try {

            await superagent
                .post(data.wh_status)
                .send(response)
                .queue('status')
                .end(function () {
                    console.log('webhooks status message....')
                });
        } catch (error) {
            console.log('Url no defined')
        }
    }

    static async wh_qrcode(session, response) {
        let data = functions.getUser(session)
        try {
            let object = {
                "wook": 'QRCODE',
                'result': 200,
                'session': session,
                'qrcode': response
            }

            await superagent
                .post(data.wh_qrcode)
                .send(object)
                .queue('qrcode')
                .end(function () {
                    console.log('webhooks status message....')
                });
        } catch (error) {
            console.log('Url no defined')
        }
    }
}
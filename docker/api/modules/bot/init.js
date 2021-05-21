const bot = require('@wppconnect-team/wppconnect');
require('dotenv').config();
const functions = require('../controllers/functions')
const events = require('../lives/events')
const webhooks = require('../endpoints/webhooks')
// Defina caso use o Browserless abaixo
const token_browser = process.env.TOKEN_BROWSERLESS

module.exports = class Bot {

    static async start(session) {
        const data = functions.getUser(session)
        try {
            const client = await bot.create(
                session,
                (base64Qrimg, ascii) => {
                webhooks.wh_qrcode(session, base64Qrimg)
                console.log(ascii)
                },
                (statusSession, session) => {
                    functions.addInfoObjects(session, {
                        status: statusSession
                    })
                    if(statusSession != 'qrReadSuccess'){
                    webhooks.wh_connect(session, statusSession)
                    }
                    
                }, {
                    headless: true,
                    logQR: true,
                    useChrome: true,
                    updatesLog: false,
                    autoClose: 90000,
                    browserArgs: [
                        '--no-sandbox',
                    ],
                    createPathFileToken: false,
                },
                {
                    WABrowserId: data.wa_browser_id,
                    WASecretBundle: data.wa_secret_bundle,
                    WAToken1: data.wa_token_1,
                    WAToken2: data.wa_token_2,
                  }
            )
          
                let info = await client.getHostDevice()
                let tokens = await client.getSessionTokenBrowser()
                let browser = [] 
                // browserless != '' ? browserless+'/devtools/inspector.html?token='+token_browser+'&wss='+browserless.replace('https://', '')+':443/devtools/page/'+client.page._target._targetInfo.targetId : null
                webhooks.wh_connect(session, 'connected', info.wid.user, browser, tokens)
                events.receiveMessage(session, client)
                events.statusMessage(session, client)
                events.statusConnection(session, client)
                functions.addInfoObjects(session, {
                    client: client,
                    tokens: tokens
                })
       
           

           return client;

        } catch (error) {

            console.log(error)
        }

    }

    static async stop(session) {
        let data = functions.getUser(session)
        let response = await data.client.close()
        if (response) {
            return true
        }
        return false

    }
}
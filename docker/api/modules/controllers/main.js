const Commands = require('./commands')
const functions = require('./functions')
const bot = require('../bot/init')
const secret = require('../key/secret')

module.exports = class Main extends Commands {

    static async connect(ctx) {
        let session = ctx.request.headers['session']
        let Notexist = functions.checkUser(session)
        if (!Notexist && ctx.request.headers['token'] == secret) {
            functions.checkAddUser(session)
            functions.addInfoObjects(session, {
                token: ctx.request.headers['token'],
                apikey: ctx.request.headers['apikey'],
                wh_status: ctx.request.body.wh_status,
                wh_message: ctx.request.body.wh_message,
                wh_qrcode: ctx.request.body.wh_qrcode,
                wh_connect: ctx.request.body.wh_connect,
                wa_browser_id: ctx.request.headers['wa_browser_id'] ? ctx.request.headers['wa_browser_id'] : '',
                wa_secret_bundle: ctx.request.headers['wa_secret_bundle'] ? ctx.request.headers['wa_secret_bundle'] : '',
                wa_token_1: ctx.request.headers['wa_token_1'] ? ctx.request.headers['wa_token_1'] : '',
                wa_token_2: ctx.request.headers['wa_token_2'] ? ctx.request.headers['wa_token_2'] : '',
            })

            let response = await bot.start(session)

            let tokens = await response.getSessionTokenBrowser()

            functions.addInfoObjects(session, {
                client: response,
                tokens: tokens
            })
            
        } else {
            if(ctx.request.headers['session'] != secret){
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }else{
                ctx.body = {
                    result: 401,
                    "status": "UNAUTHORIZED"
                }
            }
        }

    }

    static async disconnect(ctx) {
        let session = ctx.request.headers['session']
        let Notexist = functions.checkUser(session)
        let data = functions.getUser(session)
        if (Notexist && data.token == secret){
            let response = await bot.stop(session)
            if(response){
                ctx.body = {result: 200, "status": "CLOSE"}
                setTimeout(function(){
                    functions.deleteSession(session)
                },8000)
                
            }else{
                ctx.body = {result: 400, "status": "FAIL"}
            }

        } else {
            ctx.body = {result: 400, "status": "FAIL"}
        }

    }
    

    static async session(ctx) {
        let response = functions.getUser(ctx.params.session)

        console.log(response)

        ctx.body = 'Session Loading'
    }


   
}
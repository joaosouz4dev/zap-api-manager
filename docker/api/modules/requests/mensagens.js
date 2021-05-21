const Groups = require('../requests/groups')
const functions = require('../controllers/functions')
const get = require("async-get-file")
const path = require('path')
const fs = require('fs')
const ffmpeg = require('ffmpeg')
const {
    isSymbol
} = require('util')
module.exports = class Mensagens extends Groups {

    static async sendText(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                let response = await data.client.sendText(valid, ctx.request.body.text);
                // console.log(response)
                let object = {
                    result: 200,
                    type: 'text',
                    id: response.chatId?._serialized,
                    phone: response.chatId?.user,
                    content: response.body
                }

                ctx.body = object
            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }

        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }

    static async sendImage(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                let response = await data.client.sendImage(valid, ctx.request.body.url, 'imagem', ctx.request.body.text).catch(error => console.log(error))
                let object = {
                    result: 200,
                    type: 'image',
                    id: response.chatId?._serialized,
                    session: ctx.request.headers['session'],
                    phone: response.chatId?.user,
                    file: ctx.request.body.url,
                    content: response.text,
                    mimetype: response.mimeType
                }
                ctx.body = object
            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }
        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }

    static async sendVideo(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                try {
                    let name = ctx.request.body.url.split(/[\/\\]/).pop();
                    let dir = 'files/'
                    await get(ctx.request.body.url, {
                        directory: 'files'
                    });
                    let response = await data.client.sendFile(valid, dir + name, 'Video', ctx.request.body.text)
                    let object = {
                        result: 200,
                        type: 'video',
                        session: ctx.request.headers['session'],
                        id: response.chatId?._serialized,
                        phone: response.chatId?.user,
                        file: name,
                        content: response.text,
                        mimetype: response.mimeType
                    }
                    // fs.unlink(path.basename("/files")+"/"+name, erro => console.log(""))
                    ctx.body = object
                } catch (error) {
                    console.log(error)
                }

            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }
        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }

    static async sendSticker(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                try {
                    let name = ctx.request.body.url.split(/[\/\\]/).pop();
                    let dir = 'files/'
                    await get(ctx.request.body.url, {
                        directory: 'files'
                    });
                    let response = await data.client.sendImageAsSticker(valid, dir + name)
                    let object = {
                        result: 200,
                        type: 'sticker',
                        id: response.chatId?._serialized,
                        session: ctx.request.headers['session'],
                        phone: response.chatId?.user,
                        file: name,
                        content: response.text,
                        mimetype: response.mimeType
                    }
                    // fs.unlink(path.basename("/files")+"/"+name, erro => console.log(""))
                    ctx.body = object
                } catch (error) {
                    ctx.body = {
                        result: 400,
                        "status": "FAIL"
                    }
                }



            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }
        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }

    static async sendFile(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                try {
                    let name = ctx.request.body.url.split(/[\/\\]/).pop();
                    let dir = 'files/'
                    await get(ctx.request.body.url, {
                        directory: 'files'
                    });
                    let response = await data.client.sendFile(valid, dir + name, 'File', ctx.request.body.text)
                    let object = {
                        result: 200,
                        type: 'file',
                        id: response.chatId?._serialized,
                        session: ctx.request.headers['session'],
                        phone: response.chatId?.user,
                        file: name,
                        content: response.text,
                        mimetype: response.mimeType
                    }
                    // fs.unlink(path.basename("/files")+"/"+name, erro => console.log(""))
                    ctx.body = object
                } catch (error) {
                    ctx.body = {
                        result: 400,
                        "status": "FAIL"
                    }
                }



            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }
        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }
    static async sendFile64(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                try {
                    let base64 = ''
                    let response = await data.client.sendFile(valid, base64, 'File', 'oi')
                    let object = {
                        result: 200,
                        type: 'file',
                        id: response.chatId?._serialized,
                        session: ctx.request.headers['session'],
                        phone: response.chatId?.user,
                        file: name,
                        content: response.text,
                        mimetype: response.mimeType
                    }
                    // fs.unlink(path.basename("/files")+"/"+name, erro => console.log(""))
                    ctx.body = object
                } catch (error) {
                    ctx.body = {
                        result: 400,
                        "status": "FAIL"
                    }
                }



            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }
        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }

    static async sendAudio(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                try {
                    let file = ctx.request.body.url.split(/[\/\\]/).pop();
                    let name = file.split('.')[0];
                    let dir = 'files/'
                    await get(ctx.request.body.url, {
                        directory: 'files'
                    });
                   
                        let response = await data.client.sendFile(valid, dir + file, name, ctx.request.body.text)
                        let object = {
                            result: 200,
                            type: 'audio',
                            id: response.chatId?._serialized,
                            session: ctx.request.headers['session'],
                            phone: response.chatId?.user,
                            file: name,
                            content: response.text,
                            mimetype: response.mimeType
                        }
                        // fs.unlink(path.basename("/files")+"/"+name, erro => console.log(""))
                        ctx.body = object
                  
                } catch (error) {
                    ctx.body = {
                        result: 400,
                        "status": "FAIL"
                    }
                }



            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }
        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }

    static async sendVoice(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                try {
                    let file = ctx.request.body.url.split(/[\/\\]/).pop();
                    let name = file.split('.')[0];
                    let dir = 'files/'
                    await get(ctx.request.body.url, {
                        directory: 'files'
                    });

                    try {
                   
                        var process = new ffmpeg(dir + file)
                        let audio = await process
                        let mp3  = await audio.setAudioCodec('opus')
                        .fnExtractSoundToMP3(dir + name+'.mp3')
                        console.log(mp3)
                        let response = await data.client.sendPtt(valid, mp3)
                        console.log(response)
                        let object = {
                            result: 200,
                            type: 'ptt',
                            id: response.chatId?._serialized,
                            session: ctx.request.headers['session'],
                            phone: response.chatId?.user,
                            file: mp3,
                            content: response.text,
                            mimetype: response.mimeType
                        }

                     
                        ctx.body =  object


                    }catch(e){
                        console.log(e)
                        ctx.body = {
                            result: 400,
                            "status": "FAIL"
                        }
                    }

                    // fs.unlink(path.basename("/files")+"/"+name, erro => console.log(""))
                    
                } catch (error) {
                    ctx.body = {
                        result: 400,
                        "status": "FAIL"
                    }
                }



            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }
        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }

    static async sendVoiceBase64(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let base64 = ctx.request.body.base64;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                try {
                    let response = await data.client.sendPttFromBase64(valid, base64, 'none')
                    let object = {
                        result: 200,
                        type: 'audio',
                        id: response.chatId?._serialized,
                        session: ctx.request.headers['session'],
                        phone: response.chatId?.user,
                        file: name,
                        content: response.text,
                        mimetype: response.mimeType
                    }
                    // fs.unlink(path.basename("/files")+"/"+name, erro => console.log(""))
                    ctx.body = object
                } catch (error) {
                    ctx.body = {
                        result: 400,
                        "status": "FAIL"
                    }
                }



            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }
        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }

    
    static async sendLink(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                try {
                    let response = await data.client.sendLinkPreview(valid, ctx.request.body.url, ctx.request.body.text)
                    
                    let object = {
                        result: 200,
                        type: 'link',
                        id: response.chatId?._serialized,
                        session: ctx.request.headers['session'],
                        phone: response.chatId?.user,
                        content: response.text
                    }
                    ctx.body = object
                } catch (error) {
                    ctx.body = {
                        result: 400,
                        "status": "FAIL"
                    }
                }

            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }
        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }
    static async sendContact(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                try {
                    let response = await data.client.sendContactVcard(valid, ctx.request.body.contact + '@c.us', ctx.request.body.name)
                    let object = {
                        result: 200,
                        type: 'contact',
                        id: response.chatId?._serialized,
                        session: ctx.request.headers['session'],
                        phone: response.chatId?.user,
                        content: response.text
                    }
                    ctx.body = object
                } catch (error) {
                    ctx.body = {
                        result: 400,
                        "status": "FAIL"
                    }
                }

            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }
        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }

    static async sendLocation(ctx) {
        let data = functions.getUser(ctx.request.headers['session'])
        if (data && data.apikey == ctx.request.headers['apikey']) {
            let number = ctx.request.body.number;
            let valid = number.indexOf('-') > -1 ? number + '@g.us' : await functions.validNumber(ctx)
            if (valid) {
                try {
                    let response = await data.client.sendLocation(valid, ctx.request.body.lat, ctx.request.body.log, `${ctx.request.body.title}\n${ctx.request.body.description}`)
                    let object = {
                        result: 200,
                        type: 'locate',
                        id: response.chatId?._serialized,
                        session: ctx.request.headers['session'],
                        phone: response.chatId?.user,
                        content: response.text
                    }
                    ctx.body = object
                } catch (error) {
                    ctx.body = {
                        result: 400,
                        "status": "FAIL"
                    }
                }

            } else {
                ctx.body = {
                    result: 400,
                    "status": "FAIL"
                }
            }
        } else {
            ctx.body = {
                result: 400,
                "status": "FAIL"
            }
        }
    }


}


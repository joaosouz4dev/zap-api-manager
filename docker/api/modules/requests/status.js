
const functions = require('../controllers/functions')
const get = require("async-get-file")
const path = require('path')
const fs = require('fs')

module.exports = class Status{

    static async addStatusText(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){

            await data.client.sendStatusText(ctx.request.body.text)

            let object = {
                result: 200,
                status: 'SUCCESS',
            }
            ctx.body = object
          
        }else{
            ctx.body = {result: 400, "status": "FAIL"}
        }
    }


    static async addStatusImage(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
        await data.client.sendStatusImg(ctx.request.body.url, ctx.request.body.text).catch(error => console.log(error))
                let object = {
                    result: 200,
                    status: 'SUCCESS',
                }
                ctx.body = object
        }else{
            ctx.body = {result: 400, "status": "FAIL"}
        }
    }


    static async addStatusVideo(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
           
                try {
                      let name = ctx.request.body.url.split(/[\/\\]/).pop();
                      let dir = 'files/'
                      await get(ctx.request.body.url,{directory: 'files'});
                      await data.client.sendStatusVideo(dir+name, ctx.request.body.text)
                      let object = {
                          result: 200,
                          status: 'SUCCESS'
                      }
                    fs.unlink(path.basename("/files")+"/"+name, erro => console.log(""))
                    ctx.body = object
                } catch (error) {
                    console.log(error)
                }
                   
        }else{
            ctx.body = {result: 400, "status": "FAIL"}
        }
    }

}
const functions = require('../controllers/functions')
const Status = require('../requests/status')
const get = require("async-get-file")

module.exports = class Group extends Status {

    static async getAllGroups(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
        const response = await data.client.getAllChatsGroups();
        let groups = response.map(function(data){
          return {
              'id': data.id.user,
              'name': data.name,
          }
      })
         let object = {
          "result": 200,
          "groups": groups
        }

        ctx.body = object
    }else{
        let object = {
            "result": 400,
            "status": "FAIL"
            
          }
        ctx.body = object
    }
    }

    static async joinGroup(ctx){
            let data = functions.getUser(ctx.request.headers['session'])
            if(data && data.apikey == ctx.request.headers['apikey']){
           const response = await data.client.joinGroup(ctx.query.code)
           let object = {
               'result': response.status,
               'id': response.status == 200 ? response.gid.user : ''
           }
          
           ctx.body = object
            }else{
                let object = {
                    "result": 400,
                    "status": "FAIL"
                  }
                ctx.body = object
            }
        }
    static async createGroup(ctx){
            let data = functions.getUser(ctx.request.headers['session'])
            if(data && data.apikey == ctx.request.headers['apikey']){

            let participants = ctx.request.body.participants.split(',')

            let elements = participants.map(async el => {
              let object = el.replace(' ', '')
              
              return object
              
            })

           const response = await data.client.createGroup(ctx.request.body.name, elements);
           
           let object = {
               'result': response.status,
               'id': response.status == 200 ? response.gid.user : '',
               'participants': response.status == 200 ? response.participants : []
           }
          
           ctx.body = object

            }else{
                let object = {
                    "result": 400,
                    "status": "FAIL"
                  }
                ctx.body = object
            }
        }

    static async leaveGroup(ctx){
            let data = functions.getUser(ctx.request.headers['session'])
            if(data && data.apikey == ctx.request.headers['apikey']){
         
            const g = '@g.us'
            await data.client.leaveGroup(ctx.request.body.groupid+g)
            let object = {
              "result": 200,
              "messages": "SUCCESS"
            }
          ctx.body = object
         
          
            }else{
                let object = {
                    "result": 400,
                    "status": "FAIL"
                  }
                ctx.body = object
            }
        }

        static async getGroupMembers(ctx){
            let data = functions.getUser(ctx.request.headers['session'])
            if(data && data.apikey == ctx.request.headers['apikey']){
            const g = '@g.us'
            const response = await data.client.getGroupMembers(ctx.request.body.groupid+g);

            let participants = response.map(function(response){
              let object = {
              "phone": response.id.user,
              "name": response.name ? response.name : '',
              "pushname": response.isBusiness ?  response.verifiedName : response.pushname,
              "isBusiness": response.isBusiness
            }
            return object
            })
            let object = {
              "result": 200,
              "participants": participants
            }
            
            ctx.body = object
            
        }else{
            let object = {
                "result": 400,
                "status": "FAIL"
              }
            ctx.body = object
        }
        }

        static async addParticipant(ctx){
            let data = functions.getUser(ctx.request.headers['session'])
            if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
            const g = '@g.us'
            let object = []
            if(valid){
              data.client.addParticipant(ctx.request.body.groupid+g, valid);
              object = {
                "result": 200,
                "messages": "SUCCESS"
              }
           
            }else{
              object = {
                "result": 400,
                "status": "FAIL"
              }
            
            }
            ctx.body = object
            }else{
            let object = {
                "result": 400,
                "status": "FAIL"
              }
            ctx.body = object
        }
        }

        static async removeParticipant(ctx){
             let data = functions.getUser(ctx.request.headers['session'])
            if(data){
           try {
            let valid = await functions.validNumber(ctx)
            const g = '@g.us'
            if(valid){
            await data.client.removeParticipant(ctx.request.body.groupid+g, valid);
            let object = {
              "result": 200,
              "messages": "SUCCESS"
            }
          ctx.body = object
        }else{
          let object = {
            "result": 400,
            "status": "Number not valid!"
          }
        ctx.body = object
        }
           } catch (error) {
            let object = {
              "result": 400,
              "status": "FAIL"
            }
          ctx.body = object
           }
            }else{
            let object = {
                "result": 400,
                "status": "FAIL"
              }
            ctx.body = object
        }
        }

        static async promoteParticipant(ctx){
             let data = functions.getUser(ctx.request.headers['session'])
            if(data && data.apikey == ctx.request.headers['apikey']){
              let valid = await functions.validNumber(ctx)
            const g = '@g.us'
            if(valid){
             await data.client.promoteParticipant(ctx.request.body.groupid+g, valid);
            let object = {
              "result": 200,
              "messages": "SUCCESS"
            }
            ctx.body = object
          }else{
            let object = {
              "result": 400,
              "status": "FAIL"
            }
          ctx.body = object
          }
            }else{
            let object = {
                "result": 400,
                "status": "FAIL"
              }
            ctx.body = object
        }
        }

        static async demoteParticipant(ctx){
             let data = functions.getUser(ctx.request.headers['session'])
            if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
            const g = '@g.us'
            if(valid){
            await data.client.demoteParticipant(ctx.request.body.groupid+g, valid);
            let object = {
              "result": 200,
              "messages": "SUCCESS"
            }
            ctx.body = object
          }else{
            let object = {
              "result": 400,
              "status": "FAIL"
            }
          ctx.body = object
          }
            }else{
            let object = {
                "result": 400,
                "status": "FAIL"
              }
            ctx.body = object
        }
        }

        static async getGroupAdmins(ctx){
             let data = functions.getUser(ctx.request.headers['session'])
            if(data && data.apikey == ctx.request.headers['apikey']){
            const g = '@g.us'
            const response = await data.client.getGroupAdmins(ctx.request.body.groupid+g)
            let admins = response.map(function(response){
              let object = {
              "phone": response.user,
            }
            return object
            })
            let object = {
              "result": 200,
              "admins": admins
            }
            ctx.body = object
            }else{
            let object = {
                "result": 400,
                "status": "FAIL"
              }
            ctx.body = object
        }
        }
      
        static async getGroupInviteLink(ctx){
             let data = functions.getUser(ctx.request.headers['session'])
            if(data && data.apikey == ctx.request.headers['apikey']){
            const g = '@g.us'
            const response = await data.client.getGroupInviteLink(ctx.request.body.groupid+g)
            let object = {
              "result": 200,
              "convite": response
            }
            ctx.body = object
            }else{
            let object = {
                "result": 400,
                "status": "FAIL"
              }
            ctx.body = object
        }
        }


        static async setGroupPic(ctx){
          let data = functions.getUser(ctx.request.headers['session'])
          if(data && data.apikey == ctx.request.headers['apikey']){
              let number = ctx.request.body.number;
              let valid = number.indexOf('-') > -1 ? number+'@g.us' : await functions.validNumber(ctx)
              if(valid){
                  try {
                        let name = ctx.request.body.url.split(/[\/\\]/).pop();
                        let dir = 'files/'
                        await get(ctx.request.body.url,{directory: 'files'});
                        let response = await data.client.setGroupPic(valid, dir+name)
                        console.log(response)
                        let object = {
                            result: 200,
                        }
                      // fs.unlink(path.basename("/files")+"/"+name, erro => console.log(""))
                      ctx.body = object
                  } catch (error) {
                      console.log(error)
                  }
                     
              }else{
                  ctx.body = {result: 400, "status": "FAIL"}
              }
          }else{
              ctx.body = {result: 400, "status": "FAIL"}
          }
      }



}
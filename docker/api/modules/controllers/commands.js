const Mensagens = require('../requests/mensagens')
const functions = require('../controllers/functions')

module.exports = class Commands extends Mensagens {

    static async getBatteryLevel(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
       let response = await data.client.getBatteryLevel()
       let object = {
        "result": 200,
        "messages": "SUCCESS",
        "batterylevel": response
      }
       ctx.body = object
        }else{
            let object = {
                "result": 406,
              }
            ctx.body = object
        }
    }
    static async getConnectionState(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
       let response = await data.client.getConnectionState()
       let object = {
        "result": 200,
        "status": response
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

    static async getHostDevice(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
       let response = await data.client.getHostDevice()
       console.log(response)
       let object = {
        "result": 200,
        "number": response.id.user,
        "connected": response.connected,
        "phone": response.phone,
        "plataform": response.plataform,
        "locales": response.locales,
        "batery": response.batery,
        "pushname": response.pushname
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
    
   
    static async getAllContacts(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
       let response = await data.client.getAllContacts()

       console.log(response)
       
       let contacts = response.map(function(data){
        return {
            'name': data.name ? data.name : '',
            'realName': data.pushname ? data.pushname: '',
            'formattedName': data.formattedName ? data.formattedName : '',
             'phone': data.id.user,
             'business': data.isBusiness,
             'verifiedName': data.verifiedName ? data.verifiedName : '',
             'isMyContact': data.isMyContact
        }
    })
       let object = {
        "result": 200,
        "messages": "SUCCESS",
        "contacts": contacts
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

    static async getBlockList(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
       let response = await data.client.getBlockList()
       let blkcontacts = response.map(function(data){
        return {
            'phone': data ? data.split('@')[0] : '',
        }
    })
       let object = {
        "result": 200,
        "messages": "SUCCESS",
        "contacts": blkcontacts
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
    
    static async getMessagesChat(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
       let valid = await functions.validNumber(ctx)
       if(valid){
       
      let response = await data.client.getAllMessagesInChat(valid)
       let messages = response
       let object = {
        "result": 200,
        "messages": messages
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

    static async getProfilePic(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
       let valid = await functions.validNumber(ctx)
       if(valid){
       
      let response = await data.client.getProfilePicFromServer(valid)
       let object = {
        "result": 200,
        "messages": "SUCCESS",
        "pic_profile": response
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

    static async verifyNumber(ctx){
        let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
          const c = '@c.us'
          let profile = await data.client.getNumberProfile(ctx.request.body.number+c).catch(error => console.log(error))
          if(profile.numberExists){
            let object = {
             "result": 200,
             "messages": "SUCCESS",
             "profile": profile
           }
            ctx.body = object
          }else{
            let object = {
              "result": 400,
              "status": "FAIL",
              "profile": profile
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

    static async deleteChat(ctx){
         let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
       if(valid){
            await data.client.deleteChat(valid);
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
    
    static async clearChat(ctx){
         let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
       if(valid){
            await data.client.clearChatMessages(valid);
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
    
    static async archiveChat(ctx){
         let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
       if(valid){
            await data.client.archiveChat(valid, true);
            let object = {
              "result": 200,
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
    
    static async deleteMessage(ctx){
     
         let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
       if(valid){
            await data.client.deleteMessage(valid, [ctx.request.body.messageid]);
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

    static async reply(ctx){
         let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
       if(valid){
            let response = await data.client.reply(valid, ctx.request.body.text, ctx.request.body.messageid);
            let object = {
              result: 200,
              type: 'text',
              id: response.id,
              phone: response.chat.id.user,
              content: response.content
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

    static async forwardMessages(ctx){
         let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
       if(valid){
             let response = await data.client.forwardMessages(valid, [ctx.request.body.messageid]);
            let object = {
              result: 200,
              type: 'forward',
              id: response.to._serialized,
              session: ctx.request.headers['session'],
              phone: response.to.remote.user,
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
    
    static async markUnseenMessage(ctx){
         let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
       if(valid){
            await data.client.markUnseenMessage(valid);
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
    
    static async blockContact(ctx){
         let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
       if(valid){
            await data.client.blockContact(valid);
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
    
    static async unblockContact(ctx){
         let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
       if(valid){
            await data.client.unblockContact(valid);
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
    
    static async getNumberProfile(ctx){
         let data = functions.getUser(ctx.request.headers['session'])
        if(data && data.apikey == ctx.request.headers['apikey']){
            let valid = await functions.validNumber(ctx)
       if(valid){
            const response = await data.client.getNumberProfile(valid);
            let object = {
              "result": 200,
              "messages": "SUCCESS",
              "phone": response.id.user,
              "isBusiness": response.isBusiness
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
    
    
}
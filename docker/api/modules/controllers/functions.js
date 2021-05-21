module.exports = class Functions {

    static session = new Array()
    
        // checar ou adiciona um usuario na sessão
        static checkAddUser(name){
            var checkFilter = this.session.filter(order =>(order.name === name)), add = null
            if(!checkFilter.length){
                add = {
                    name: name,
                }
                this.session.push(add)
                return true
              }
               return false  
        }
    
        // checar se exite o usuario na sessão
        static checkUser(name){
            var checkFilter = this.session.filter(order =>(order.name === name))
            if(checkFilter.length){
                return true
            }
                return false   
        }
    
        // pegar index da sessão (chave)
        static getSessionKey(name){
            if(this.checkUser(name)){
                for(var i in this.session){
                    if(this.session[i].name === name){
                        return i
                    }
                }
             }
            return false
        }
    
        // adicionar informações a sessão 
        static addInfoObjects(name, extend){
            if(this.checkUser(name)){
                for(var i in this.session){
                    if(this.session[i].name === name){
                        Object.assign(this.session[i], extend)
                        return true
                    }
                }
            }
            return false  
        }
        
        // Remove object na sessão
        static removeInfoObjects(name, key){
            if(this.checkUser(name)){
                for(var i in this.session){
                    if(this.session[i].name === name){
                        delete this.session[i][key]
                        return true
                    }
                }
            }
            return false  
        }
    
        // deletar sessão
        static deleteSession(name){
            if(this.checkUser(name)){
                var key = this.getSessionKey(name)
                delete this.session[key]
                return true     
            }
            return false
        }
    
        // retornar sessão
        static getUser(name){
            if(this.checkUser(name)){
                var key = this.getSessionKey(name)
                return this.session[key]
            }
            return false
        }
    
         // retornar todas
         static  getAll(){
            return this.session
        }

        // checa o client
        static checkClient(name){
            if(this.getUser(name) && this.getUser(name).client){
                return true
            }
             return false
        }
    
        // checking if sessionName exist in url
        static checkSession(name){
            if(name && name > 0 ){
                return true
            } 
            return false
        }

        static async validNumber(ctx){
            const c = '@c.us'
            let data = this.getUser(ctx.request.headers['session'])
            let profile = await data.client.getNumberProfile(ctx.request.body.number+c).catch(error => console.log(error))
            if(profile.numberExists){
                return profile.id._serialized
            }else{
                return false
            }
        }

        static async verifyNumber(session, number){
            const c = '@c.us'
            let data = this.getUser(session)
            let profile = await data.client.getNumberProfile(number+c).catch(error => console.log(error))
            if(profile.numberExists){
                return profile.id._serialized
            }else{
                return false
            }
        }
       
}
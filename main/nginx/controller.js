var fs = require('fs');
const cmd = require('./commands')

module.exports = class controller{
    
    static createFile(name, port){
        let content = `
        location /${name}/ {
            rewrite /${name}/(.*)$ /$1 break;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
            proxy_set_header X-NginX-Proxy true;
            proxy_set_header X-Ssl on;
            proxy_pass http://127.0.0.1:${port};
            proxy_redirect off;
          }
        `       
        fs.writeFile("/etc/nginx/proxy/"+name+'.conf', content, function(erro) {

            if(erro) {
                throw erro;
                return false
            }
            cmd.nginxReload()
            return true
        }); 
    }

   static removeFile(name){
        let path = `/etc/nginx/proxy/${name}.conf`
        fs.unlinkSync(path)
        cmd.nginxReload()
        return true
    }

    static checkFile(name){
        let path = `/etc/nginx/proxy/${name}.conf`
        if(fs.existsSync(path)){
            return true
        }

        return false
    }
   
}
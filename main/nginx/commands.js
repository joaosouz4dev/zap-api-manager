const { exec } = require('child_process');
module.exports = class commands{
    static nginxReload(){
        exec("service nginx restart", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return false;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return false;
            }
           return true
        });
    }
}
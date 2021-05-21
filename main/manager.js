const {
  Docker
} = require('node-docker-api')
const Control = require('./nginx/controller')
const dc = new Docker();
const image = 'api'
const execShPromise = require("exec-sh").promise;

module.exports = class manager {

  static async run(ctx, port, name, memory) {

    try {
      var memoria = 1048576 * Number(memory ? memory : 100)
      var digits_port = String(port.replace('/', '')).length
      var increment_port = '';
      switch (digits_port) {
        case 1:
          increment_port = '400'
          break
        case 2:
          increment_port = '40'
          break
        case 3:
          increment_port = '4'
          break
        case 4:
          increment_port = ''
          break
      }
      await dc.container.create({
        Image: image,
        name: "api-"+name,
        ExposedPorts: {
          "3001/tcp": {}
        },
        HostConfig: {
          Memory: memoria,
          MemorySwap: memoria * 2,
          MemorySwappiness: 100,
          RestartPolicy: { Name: "always", MaximumRetryCount: 0 },
          PortBindings: {
            "3001/tcp": [{
              "HostPort": increment_port+port.replace('/', '')
            }]
          },
          Binds: [
            "/home/files:/home/api/files",
            "/home/tokens:/home/api/tokens"
          ],
          PublishAllPorts: true
        }
      }).then(container => container.start()).catch(err => console.log(err));
      Control.createFile("api-"+name, increment_port+port.replace('/', ''))
      ctx.body = {
        "result": 200,
        "message": "SUCCESS"
      }
    } catch (error) {
      ctx.body = {
        "result": 400,
        "message": "FAIL"
      }
    }
  }

  static async startContainerByName(ctx, name) {
    try {
      const containers = await this.getContainerByName("api-"+name);
      await this.startContainer(containers[0]);
      ctx.body = [{
        "result": 200,
        "message": "SUCCESS"
      }]
    } catch (error) {
      ctx.body = [{
        "result": 400,
        "message": "FAIL"
      }]
      return false;
    }
  }

  static async stopContainerByName(ctx, name) {
    try {
      const containers = await this.getContainerByName("api-"+name);
      await this.stopContainer(containers[0]);
      ctx.body = {
        "result": 200,
        "message": "SUCCESS"
      }
    } catch (error) {
      ctx.body = {
        "result": 400,
        "message": "FAIL"
      }
    }
  }


  static async deleteContainerByName(ctx, name) {
    try {
      const containers = await this.getContainerByName("api-"+name);
      await this.deleteContainer(containers[0]);
      await Control.removeFile("api-"+name)
      ctx.body = {
        "result": 200,
        "message": "SUCCESS"
      }
    } catch (error) {
      ctx.body = {
        "result": 400,
        "message": "FAIL"
      }
    }
  }

  static async getContainerByName(name) {
    const containers = await this.getContainers();
    let selectContainer = containers.filter(container => {
      return container.data.Names[0].replace('/', '') == name;
    });

    return selectContainer;
  }


  static async getContainers() {
    let datas = [];
    try {
      const containers = await dc.container.list({
        all: true
      });
      return containers;
    } catch (error) {
      console.log(error);
    }

    return datas;
  }

  static async deleteContainer(container) {
    try {
      await this.stopContainer(container).then(container => container.delete({
        v: true
      }));
     
      return true;
    } catch (error) {
      
      return false;
    }
  }

  static async startContainer(container) {
    try {
      return await container.start();
    } catch (error) {
      ctx.body = {
        "result": 400,
        "message": "TOKEN_INVALID"
      }
      return null;
    }
  }

  static async stopContainer(container) {
    try {
      return await container.stop();
    } catch (error) {
      ctx.body = {
        "result": 400,
        "message": "TOKEN_INVALID"
      }
      return null;
    }
  }
  
  static async listContainers(ctx){
    
    let command = await execShPromise('docker ps', true)

    ctx.body =  command.stdout;
    
  }

  static isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}


}
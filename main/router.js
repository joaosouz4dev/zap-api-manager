const manager = require("./manager");
require("dotenv").config({ path: `/home/zap-api-manager/.env` });
const token = process.env.TOKEN;

module.exports = (router) => {
  router
    .get("/", (ctx) => {
      ctx.body = "<h1>OK</h1>";
    })
    .get("/run/:token/:id/:memory?", async (ctx) => {
      let name = ctx.params.id;
      let port = ctx.params.id;
      let memory = ctx.params.memory;
      if (manager.isNumber(name) && manager.isNumber(port)) {
        if (ctx.params.token == token) {
          await manager.run(ctx, port, name, memory);
        } else {
          ctx.body = {
            result: 400,
            message: "TOKEN_INVALID",
          };
        }
      } else {
        ctx.body = {
          result: 400,
          message: "ID_AND_PORT_NOT_NUMBER",
        };
      }
    })
    .get("/start/:token/:id", async (ctx) => {
      let name = ctx.params.id;
      if (manager.isNumber(name)) {
        if (ctx.params.token == token) {
          await manager.startContainerByName(ctx, name);
        } else {
          ctx.body = {
            result: 400,
            message: "TOKEN_INVALID",
          };
        }
      } else {
        ctx.body = {
          result: 400,
          message: "ID_NOT_NUMBER",
        };
      }
    })
    .get("/stop/:token/:id", async (ctx) => {
      let name = ctx.params.id;
      if (manager.isNumber(name)) {
        if (ctx.params.token == token) {
          await manager.stopContainerByName(ctx, name);
        } else {
          ctx.body = {
            result: 400,
            message: "TOKEN_INVALID",
          };
        }
      } else {
        ctx.body = {
          result: 400,
          message: "ID_NOT_NUMBER",
        };
      }
    })
    .get("/delete/:token/:id", async (ctx) => {
      let name = ctx.params.id;
      if (manager.isNumber(name)) {
        if (ctx.params.token == token) {
          await manager.deleteContainerByName(ctx, name);
        } else {
          ctx.body = {
            result: 400,
            message: "TOKEN_INVALID",
          };
        }
      } else {
        ctx.body = {
          result: 400,
          message: "ID_NOT_NUMBER",
        };
      }
    })
    .get("/list/:token", async (ctx) => {
      if (ctx.params.token == token) {
        await manager.listContainers(ctx);
      } else {
        ctx.body = {
          result: 400,
          message: "TOKEN_INVALID",
        };
      }
    });
};

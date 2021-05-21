const Koa = require('koa');
const Router = require('koa-router')
const app = new Koa();
const router = new Router();
require('./main/router')(router)

app.use(router.routes())

app.listen(3001, () => {
    console.log('Initialized in port 3001')
});
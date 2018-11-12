const koa = require('koa');
const koaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
//const index = require('./index');
const port=process.env.PORT || 3000;
const db = require('../db/griddao');

const app = new koa();
const router = new koaRouter();

//app.use(async ctx => ctx.body = '@elpoeta');

app.use(serve("."));
//app.use(bodyParser());

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false
});


router.get('/doctor', async ctx =>{
    const data = await db.viewAll();
    ctx.body = data;
   
});
router.get('/doctor/:id', async ctx =>{
    const data = await db.view(ctx.params.id);
    ctx.body = data;
});;
//router.get('/', index.home);
//router.get('/list', index.listado);
router.get('/test', ctx =>(ctx.body='@elpoeta Testing..'));

app.use(router.routes()).use(router.allowedMethods);
app.listen(port, () => console.log('Server started...'));
const koa = require('koa');
const koaRouter = require('koa-router');
const koaJson = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
//const index = require('./index');
const port=process.env.PORT || 3000;
const db = require('../db/griddao');

const app = new koa();
const router = new koaRouter();
const homePage ={
    "views": [
        {"home": "@elpoeta Home test Postgresql page RUTAS...."},
        {"db":
            [
                {"doctor": "/doctor"},
                {"doctor by id": "/doctor/id"},
                {"grid": "/grid"},
                {"grid by doctor id": "/grid/doctor/id"},
            ]
        }
    ]
};
//app.use(async ctx => ctx.body = '@elpoeta');
app.use(koaJson());
app.use(serve("."));
//app.use(bodyParser());

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false
});

router.get('/', ctx =>(ctx.body=homePage));

router.get('/doctor', async ctx =>{
   try{
    const data = await db.viewAll();
    ctx.body = data;
 
}catch(e){
    ctx.body = `Error ${e}`;
}
   
});
router.get('/doctor/:id', async ctx =>{
   
    try{
        const data = await db.view(ctx.params.id);
        if(data !== undefined){
           ctx.body = data;             
        }else {
            ctx.body = `Doctor con id: ${ctx.params.id} no encontrado`;

        }
        
    }catch(e){
        ctx.body = `Error ${e}`;
    }
   
});
router.get('/grid', async ctx =>{
    try{
     const data = await db.viewAllGrid();
     ctx.body = data;
  
 }catch(e){
     ctx.body = `Error ${e}`;
 }
    
 });
router.get('/grid/doctor/:id', async ctx =>{
   
    try{
        const data = await db.viewGridByDoctorId(ctx.params.id);
        if(data !== undefined){
           ctx.body = data;             
        }else {
            ctx.body = `Grid doctor con id: ${ctx.params.id} no encontrado`;

        }
        
    }catch(e){
        ctx.body = `Error ${e}`;
    }
   
});
//router.get('/', index.home);
//router.get('/list', index.listado);
router.get('/test', ctx =>(ctx.body='@elpoeta Testing..'));

app.use(router.routes()).use(router.allowedMethods);
app.listen(port, () => console.log('Server started...'));
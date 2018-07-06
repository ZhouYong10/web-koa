const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()

const views = require('koa-views')
//const co = require('co')
//const convert = require('koa-convert')
const json = require('koa-json')
//const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
//const logger = require('koa-logger')
//const debug = require('debug')('koa2:server')
const path = require('path')
const log4js = require('./utils/log').log4js;

const config = require('./config')
const routes = require('./routes')

const port = process.env.PORT || config.port
const LOG = log4js.getLogger('app');
// error handler
//onerror(app)

// middlewares
app.use(require('./utils/log').logger)
  .use(bodyparser())
  .use(json())
  //.use(logger())
  .use(require('koa-static')(__dirname + '/public'))
  .use(views(path.join(__dirname, '/views'), {
    options: {settings: {views: path.join(__dirname, 'views')}},
    map: {'ejs': 'ejs'},
    extension: 'ejs'
  }))
  .use(router.routes())
  .use(router.allowedMethods())


router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.state = {
    title: 'Hello Koa2'
  }
  //LOG.debug('这是log4js打印的debug信息');
  //LOG.info('这是log4js打印的debug信息');
  //LOG.warn('这是log4js打印的debug信息');
  LOG.error('这是log4js打印的debug信息');
  //debug("这是debug输出的信息");
  console.log(hello);
  await ctx.render('index', ctx.state)
})

routes(router)
app.on('error', function(err, ctx) {
  console.log(err, '============================');
  //logger.error('server error', err, ctx)
})

module.exports = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})

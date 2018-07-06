const users = require("./users");

module.exports =  (router) => {
  users(router);

  router.get('/welcome', async function (ctx, next) {
    ctx.state = {
      title: 'koa2 title'
    };

    await ctx.render('welcome', {title: ctx.state});
  })
}

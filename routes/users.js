



module.exports =  (router) => {
  router.get('/user', async function (ctx, next) {
    ctx.body = {foo: 'bar', baz: 'foo', name: 'zhangsan', age: 4};
  })
}

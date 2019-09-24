const router = require('koa-router')();
// navigate to home page
router.get('/', async (ctx, next) => {
  //render index.ejs template, display hello world notice
  await ctx.render('index', {
    title: 'Hello World'
  })
});

module.exports = router;

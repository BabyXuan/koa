const router = require('koa-router')();
// navigate to home page
router.get('/', async (ctx, next) => {
  //render index.ejs template, display hello world notice
  await ctx.render('index', {
    title: 'Hello World'
  })
});

//navigate to math page, render the math template
router.get('/math', async (ctx, next) => {
  await ctx.render('math', {
    title: 'Math Expression'
  });
});

//provider an entry point in the server side to do the calculation
router.post('/calculate', (ctx, next) => {
  //get the expression
  const expression = ctx.request.body.expression;
  //use eval to do the calculation
  try {
    //eval function is not very safe, so do validation for the user input first
    //the user input should only contain + - * / ( ) and space
    const filtered = expression.replace(/[\d\+\-\*\/\(\)\s]*/g, "");

    if (filtered.length !== 0) {
      throw 'invalid expression';
    }
    //after the validation from user input, we could use eval to calculate the result:
    ctx.status = 200;
    ctx.message = eval(expression).toString();
  } catch (e) {
    ctx.status = 200;
    ctx.message = 'invalid expression, please input only + - * / and numbers';
  }
});

module.exports = router;

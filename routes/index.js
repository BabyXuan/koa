const router = require('koa-router')();
//define status code
const INVALID_USERNAME = 0;
const INVALID_PASSWORD = 1;
const SUCCESS = 2;
const FAIL = 3;

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
    ctx.body = {status: SUCCESS, message: eval(expression).toString()};
  } catch (e) {
    ctx.body = {status: FAIL, message: 'invalid expression, please input only + - * / and numbers'}
  }
});

//navigate to login page, render the login ejs template
router.get('/login', async (ctx, next) => {
  await ctx.render('login', {
    title: 'Please login'
  })
});

//when user login with certain credentials
//compare the hashed userName and hashed password with the one stored in the server side
//since we only have one user here, we can just hash "testuser" and "password1234";

router.post('/auth', async (ctx, next) => {
  //the hashed result for username "testuer"
  const encryptedUserName = '33ef37db24f3a27fb520847dcd549e9f';
  //the hashed result for password "password1234"
  const encryptedPassWord = 'bdc87b9c894da5168059e00ebffb9077';
  const query = ctx.request.body;
  //get the hashed credentials from the user:

  //if the hash val of userName is not equal to the hash val of "testuser"
  //it means invalid user
  if(query.username !== encryptedUserName) {
    ctx.body = {status: INVALID_USERNAME, message: 'The user does not exist'}
    //if the hash val of password is not equal to the hash val of "password1234"
    //it means invalid password
  } else if(query.password !== encryptedPassWord) {
    ctx.body = {status: INVALID_PASSWORD, message: 'The password is not correct!'}
  } else {
    ctx.body = {status: SUCCESS, message: 'You have successfully logged in'}
  }
});

module.exports = router;

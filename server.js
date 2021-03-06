const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// __dirname leads to absolute path of root directory

//Let's log some express data to the screen
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log',log + '\n', (err) => { // \n means new line
    if (err) {
      console.log('Unable to append file');
    }
  });
  next();
});

//CHALLENGE - MAINTENANCE Page

// SUCCESS
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//This is called a handler.
app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMsg: 'Heyyyyy Welcome'
  });
});
app.get('/about', (req, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
});
app.get('/programs', (req, res) => {
  res.render('programs.hbs',{
    pageTitle: 'Programs Portfolio'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'you suck'
  });
});
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

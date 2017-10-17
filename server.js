const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.use((req, res, next) => { //next tells express when done, without handlers won't run
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintnace', {
//
//   });
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});


app.set('view engine', 'hbs');
//MiddleWare helps you configure how your express application works(3rd party addon)
app.use(express.static(__dirname + '/public'));//__dirname stores the path to your project's directory


app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the home page!'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad (when request fails) -send back json with errorMessage property

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle reqest'
  });
});

app.listen(3000, ()=> {
  console.log('Server is up on port 3000');
  console.log(__dirname + '/views/partials');
});

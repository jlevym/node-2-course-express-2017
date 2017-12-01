const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 4000;

var app = express();

hbs.registerHelper('screamOut', (text) => {
   return text.toUpperCase();
});
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var time = new Date().toString();
  var log = `${time}: ${req.method}, ${req.url}`
  fs.appendFile('systemLog', log + '\n', (err) => {
    if (err) {
      console.log(err);
    }
  });
  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance', {
//     welcomeMessage : ' this site is currently being upgraded. We will be back soon'
//   });
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home', {
    title : 'express app',
    pageTitle : 'this is my home page',
    welcomeMessage : ' welcome to my fun website',
    currentYear : new Date().getFullYear()
  });
});
app.get('/projects', (req, res) => {
  res.render('projects', {
    title : 'express-app',
    pageTitle : 'projects',
    welcomeMessage : 'these are my projects',
    currentYear : new Date().getFullYear()
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'this is my about page',
    currentYear: new Date().getFullYear()
  });
});

app.get('/bad', (req, res) => {
  res.send({  errorMessage : 'unable to retrieve data'})
})


app.listen(port, () => {
  console.log(`listening on localhost:${port}`);
})

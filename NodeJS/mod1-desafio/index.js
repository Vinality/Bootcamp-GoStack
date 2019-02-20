const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'njk');

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});

const checkAge = (req, res, next) => {
  const {age} = req.query;

  if (!age) {
    return res.redirect('/');
  } else {
    return next();
  }
};

app.get('/', (req, res) => {
  return res.render('form');
});

app.post('/check', (req, res) => {
  const {age} = req.body;
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${age}`);
  } else {
    return res.redirect(`/minor?age=${age}`);
  }
});

app.get('/major', checkAge, (req, res) => {
  return res.render('majorpage', {age: req.query.age});
});

app.get('/minor', checkAge, (req, res) => {
  return res.render('minorpage', {age: req.query.age});
});

app.listen(3000);

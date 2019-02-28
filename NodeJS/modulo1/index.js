const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'njk');

const users = ['Diego Fernandes', 'Vinality'];

app.get('/', (req, res) => {
  return res.render('list', {users: users});
});

app.get('/new', (req, res) => {
  return res.render('new');
});

app.post('/create', (req, res) => {
  console.log(req.body);
  users.push(req.body.user);
  return res.redirect('/');
});

app.listen(3000);

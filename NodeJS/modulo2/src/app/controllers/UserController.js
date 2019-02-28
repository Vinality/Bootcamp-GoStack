const {User} = require('../models');

class UserController {
  create(req, res) {
    return res.render('auth/signup');
  }

  async store(req, res) {
    const {name, password, email} = req.body;
    const {filename} = req.file;
    console.log(req.body);

    if (!password || !name || !email) {
      req.flash('error', 'Preencha todos os campos');
      return res.redirect('/signup');
    }

    const hasEmail = await User.findOne({where: {email: email}});

    if (hasEmail) {
      req.flash('error', 'Email já cadastrado');
      return res.redirect('/signup');
    }

    await User.create({...req.body, avatar: filename});

    return res.redirect('/');
  }
}

module.exports = new UserController();

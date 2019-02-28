const {User} = require('../models');

class SessionController {
  async create(req, res) {
    return res.render('auth/signin');
  }

  async store(req, res) {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});

    if (!email) {
      req.flash('error', 'Insira um email válido');
      return res.redirect('/');
    }

    if (!user) {
      req.flash('error', 'Usuário não encontrado');
      return res.redirect('/');
    }

    if (!password) {
      req.flash('error', 'Preencha todos os campos');
      return res.redirect('/');
    }

    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha incorreta');
      return res.redirect('/');
    }

    req.session.user = user;

    return res.redirect('/app/dashboard');
  }

  destroy(req, res) {
    req.session.destroy(() => {
      res.clearCookie('root');
      return res.redirect('/');
    });
  }
}

module.exports = new SessionController();

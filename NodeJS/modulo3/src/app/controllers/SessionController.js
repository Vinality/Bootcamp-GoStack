const User = require('../models/User');

class SessionController {
  // Recebe o usuario e a senha do corpo da requisicao e autentica o usuario
  async store(req, res) {
    const {email, password} = req.body;

    // Apos encontrar o usuario no BD, testa se a senha está correta
    // usando o bcrypt
    const user = await User.findOne({email});

    if (!user) {
      return res.status(400).json({error: 'User not found'});
    }

    if (!await user.compareHash(password)) {
      return res.status(400).json({error: 'Wrong Password'});
    }

    // Caso a senha esteja correta, gera um token
    // E o salva no req.userId
    return res.json({user, token: User.generateToken(user)});
  }
}

module.exports = new SessionController();

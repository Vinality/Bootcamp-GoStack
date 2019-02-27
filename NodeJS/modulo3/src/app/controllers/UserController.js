const User = require('../models/User');

class UserController {
  // Cria um novo User no BD caso ele ja não exista
  async store(req, res) {
    const {email} = req.body;

    if (await User.findOne({email})) {
      return res.status(400).json({
        error: 'User already exists',
      });
    }

    const user = await User.create(req.body);

    return res.json(user);
  }
}

module.exports = new UserController();

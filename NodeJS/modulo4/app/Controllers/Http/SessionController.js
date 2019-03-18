'use strict'

class SessionController {
  async store({ request, response, auth }) {
    const {email, password} = request.all();

    const token = auth.atempt(email, password);

    return token;
  }
}

module.exports = SessionController

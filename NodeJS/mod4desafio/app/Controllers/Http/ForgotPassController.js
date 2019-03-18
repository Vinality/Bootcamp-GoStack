"use strict";

const moment = require("moment");
const crypto = require("crypto");
const User = use("App/Models/User");
const Mail = use("Mail");

class ForgotPassController {
  async store({ request, response }) {
    try {
      const email = request.input("email");
      const user = await User.findByOrFail("email", email);

      user.token = crypto.randomBytes(10).toString("hex");
      user.token_created_at = new Date();

      await user.save();

      await Mail.send(
        ["emails.forgotpass"],
        { email, token: user.token },
        message => {
          message
            .to(user.email)
            .from("vinality@tester.com | Vinality")
            .subject("Recuperação de senha");
        }
      );
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: "Algo de errado não esta certo" } });
    }
  }

  async update({ request, response }) {
    try {
      const { token, newPass } = request.all();

      const user = await User.findByOrFail("token", token);

      const tokenExpired = moment()
        .subtract("2", "days")
        .isAfter(user.token_created_at);

      if (tokenExpired) {
        return response
          .status(error.status)
          .send({ error: { message: "Token expirado" } });
      }

      user.password = newPass;
      user.token = null;
      user.token_created_at = null;

      await user.save();

    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: "Algo de errado não esta certo 2" } });
    }
  }
}

module.exports = ForgotPassController;

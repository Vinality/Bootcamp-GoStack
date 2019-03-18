"use strict";

class Forgot {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: "required|email"
    };
  }
}

module.exports = Forgot;

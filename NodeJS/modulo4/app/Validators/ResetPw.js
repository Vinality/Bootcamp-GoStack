"use strict";

class ResetPw {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      token: 'required',
      password: 'required|confirmed'
    };
  }
}

module.exports = ResetPw;

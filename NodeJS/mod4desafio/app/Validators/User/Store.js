"use strict";

class Store {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: "required|unique:users,username",
      email: "required|email|unique:users,email",
      password: "required|confirmed"
    };
  }
}

module.exports = Store;

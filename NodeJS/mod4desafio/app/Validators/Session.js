"use strict";

class Session {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: `required|unique:users, username, id${userId}`,
      password: 'confirmed'
    };
  }
}

module.exports = Session;

"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CalendarSchema extends Schema {
  up() {
    this.create("calendars", table => {
      table.timestamp("when");
      table.string("name").notNullable();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table.increments();
      table.timestamps();
    });
  }

  down() {
    this.drop("calendars");
  }
}

module.exports = CalendarSchema;

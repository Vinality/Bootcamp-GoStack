"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

const Route = use("Route");

Route.post("users", "UserController.store").validator('User/Store');
Route.post("session", "SessionController.store").validator('Session');
Route.post("password", "ForgotPassController.store").validator('Forgot');
Route.put("recover", "ForgotPassController.update").validator('Reset');

Route.group(() => {
  Route.resource("events", "CalendarController")
    .apiOnly()

  Route.post("events/:events_id/share", "ShareEventController.share");

  Route.put("users/:id", "UserController.update");
}).middleware("auth");

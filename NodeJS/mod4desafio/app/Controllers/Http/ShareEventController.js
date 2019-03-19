"use strict";

const Calendar = use("App/Models/Calendar");
const Kue = use("Kue");
const Job = use("App/Jobs/ShareEvent");

class ShareEventController {
  async share({request, response, params, auth}) {
    const event = await Calendar.findOrFail(params.events_id);
    const email = request.input('email');

    if (event.user_id !== auth.user.id) {
      return response.status(401).send({
        error: {
          message: 'Você não é o criador do evento'
        }
      })
    }

    Kue.dispatch(
      Job.key,
      { email, username: auth.user.username, event },
      { attempts: 3 }
    )

    return email;
  }
}

module.exports = ShareEventController;

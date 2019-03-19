'use strict'

const Mail = use('Mail')

class ShareEvent {
  static get concurrency() {
    return 1
  }

  static get key() {
    return 'ShareEvent-job'
  }

  async handle({ email, username, event }) {
    await Mail.send(['emails.share_event'], { username, event }, message => {
      message
        .to(email)
        .from('vinality@seila.com', 'Vinality')
        .subject(`Evento: ${event.name}`)
    })
  }
}

module.exports = ShareEvent
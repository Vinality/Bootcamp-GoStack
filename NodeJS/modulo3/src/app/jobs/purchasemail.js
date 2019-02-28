const Mail = require('../services/mail');

class PurchaseMail {
  get Key() {
    return 'PurchaseMail';
  }

  async handle(job, done) {
    const {ad, user, content} = job.data;

    await Mail.sendMail({
      from: '"Vinality Testador" <vinality@seila.com>',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: 'purchase',
      context: {user, content, ad},
    });

    return done();
  }
}

module.exports = new PurchaseMail();

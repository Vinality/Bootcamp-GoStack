/* eslint-disable max-len */
const User = require('../models/User');
const Ad = require('../models/Ad');
const Purchase = require('../models/Purchase');
const PurchaseMail = require('../jobs/purchasemail');
const Queue = require('../services/Queue');

class PurchaseController {
  // Encontra o Anuncio referenciado pelo id que vem na requisicao
  // e encontra o usuario autenticado no BD
  async store(req, res) {
    const {ad, content} = req.body;

    const purchaseAd = await Ad.findById(ad).populate('author');
    const user = await User.findById(req.userId);

    // Cria uma fila para o envio de email via node-mailer
    // para que o envio ocorre em background
    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content,
    }).save();

    // Cadastra uma nova Purchase no BD, com os dados do usuario
    // do autor do anuncio e o id do anuncio que se deseja comprar
    await Purchase.create({
      buyer: user,
      vendor: purchaseAd.author,
      ad: purchaseAd,
    });

    return res.send();
  }

  // Lista todos as compras associadas a aquele autor
  // Ou seja, só mostra as notificacoes de compra de anuncios
  // criados pelo usuario atual
  async index(req, res) {
    const user = await User.findById(req.userId);
    const populateQuery = [
      {path: 'buyer', select: ['id', 'name']},
      {path: 'vendor', select: ['id', 'name']},
    ];

    const purchases = await Purchase.find({
      vendor: user,
    }).populate(populateQuery);

    return res.json(purchases);
  }

  // A partir do id da compra e o usuario autenticado
  // encontra o anuncio referenciado e o User comprador
  // e então atualiza o anuncio como comprado caso ja não esteja
  async accept(req, res) {
    const {id} = req.body;
    const purchase = await Purchase.findById(id);
    const purchasedAd = await Ad.findById(purchase.ad);
    const buyer = await User.findById(purchase.buyer);

    if (req.userId != purchasedAd.author._id) {
      return res.status(400).json({error: 'You are not the ad author'});
    }

    if (purchasedAd.purchasedBy) {
      return res.status(400).json({error: 'This ad has already been bought'});
    }

    // Marca o usuario que comprou o anuncio
    await Ad.findByIdAndUpdate(purchasedAd._id, {
      purchasedBy: buyer,
    });

    return res.send();
  }
}

module.exports = new PurchaseController();

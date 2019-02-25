/* eslint-disable max-len */
const User = require('../models/User');
const Ad = require('../models/Ad');
const Purchase = require('../models/Purchase');
const PurchaseMail = require('../jobs/purchasemail');
const Queue = require('../services/Queue');

class PurchaseController {
  async store(req, res) {
    const {ad, content} = req.body;

    const purchaseAd = await Ad.findById(ad).populate('author');
    const user = await User.findById(req.userId);

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content,
    }).save();

    await Purchase.create({
      buyer: user,
      vendor: purchaseAd.author,
      ad: purchaseAd,
    });

    return res.send();
  }

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

    await Ad.findByIdAndUpdate(purchasedAd._id, {
      purchasedBy: buyer,
    });

    return res.send();
  }
}

module.exports = new PurchaseController();

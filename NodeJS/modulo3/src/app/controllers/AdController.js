const Ad = require('../models/Ad');

class AdController {
  // Lista todos os Ads a partir dos filtros especificados na URL
  async index(req, res) {
    const filters = {purchasedBy: null};

    if (req.query.price_min || req.query.price_max) {
      filters.price = {};

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min;
      }

      if (req.query.price_min) {
        filters.price.$lte = req.query.price_max;
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i');
    }

    const ads = await Ad.paginate(filters, {
      limit: 20,
      page: req.query.page || 1,
      populate: ['author'],
      sort: '-createdAt',
    });

    return res.json(ads);
  }

  // Mostra um unico anuncio a partir da ID passada na URL
  async show(req, res) {
    const ad = await Ad.findById(req.params.id);

    return res.json(ad);
  }

  // Cria um novo Ad enviando os parametros do corpo da requisição
  // e seta como autor o usuario autenticado na sessaos
  async store(req, res) {
    const ad = await Ad.create({...req.body, author: req.userId});

    return res.json(ad);
  }

  // Atualiza um Ad a partir do corpo da requisicaos
  async update(req, res) {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.json(ad);
  }

  // Deleta um Ad a partir do Id fornecido na URL
  async destroy(req, res) {
    await Ad.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new AdController();

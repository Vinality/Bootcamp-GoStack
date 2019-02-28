const {User, Appointment} = require('../models');
const moment = require('moment');
const {Op} = require('sequelize');

class ScheduleController {
  async index(req, res) {
    const provider = await User.findByPk(req.session.user.id);

    return res.render('schedule/index', {provider});
  }

  async list(req, res) {
    const date = moment(parseInt(req.query.date));

    const appointments = await Appointment.findAll({
      include: [{model: User, as: 'user'}],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format(),
          ],
        },
      },
      order: [['date', 'ASC']],
    });
    return res.render('schedule/list', {appointments});
  }
}

module.exports = new ScheduleController();

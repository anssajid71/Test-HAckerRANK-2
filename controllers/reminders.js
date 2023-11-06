const Reminders = require('../models/reminders');

const createReminder = async (req, res) => {
  try {
    const { description, date, user } = req.body;
    const reminder = await Reminders.create({ description, date, user });
    res.status(201).json(reminder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllReminders = async (req, res) => {
  try {
    const { user, after } = req.query;
    const where = {};

    if (user) {
      where.user = user;
    }

    if (after) {
      where.date = { [Op.gte]: new Date(parseInt(after)) };
    }

    const reminders = await Reminders.findAll({ where, order: [['id', 'ASC']] });
    res.status(200).json(reminders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getReminderById = async (req, res) => {
  try {
    const { id } = req.params;
    const reminder = await Reminders.findByPk(id);

    if (reminder) {
      res.status(200).json(reminder);
    } else {
      res.status(404).json({ error: 'ID not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createReminder,
  getAllReminders,
  getReminderById,
};

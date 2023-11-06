const Analytics = require('../models/analytics');
const { Op } = require('sequelize');

async function createEvent(req, res) {
  try {
    const { eventType, user } = req.body;

    const existingEvent = await Analytics.findOne({
      where: {
        user,
        eventType,
        date: {
          [Op.gte]: new Date(new Date() - (eventType === 'click' ? 3000 : 5000)),
        },
      },
    });

    if (existingEvent) {
      return res.status(400).json({ error: 'Event already exists in the time window.' });
    }

    const event = await Analytics.create({ eventType, user, date: new Date() });
    return res.status(201).json({ ingested: 1 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getEvents(req, res) {
  try {
    const events = await Analytics.findAll();
    return res.status(200).json(events);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createEvent,
  getEvents,
};

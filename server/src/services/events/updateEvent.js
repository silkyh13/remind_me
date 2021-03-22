module.exports = function updateEvent(model, eventId) {
  model.where({ _id: eventId }).update({ sentReminder: true }).exec();
};

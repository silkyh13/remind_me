const users = require('./users/users.service.js');
const events = require('./events/events.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(events);
};

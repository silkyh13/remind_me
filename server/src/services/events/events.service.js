// Initializes the `events` service on path `/events`
const { Events } = require("./events.class");
const createModel = require("../../models/events.model");
const hooks = require("./events.hooks");
const cronMailer = require("./cron-mailer");
module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
  };
  cronMailer(options.Model);
  // Create cron job to search for events that occur 30 minutes from now every minute
  //register routes for events
  app.use("/events", new Events(options, app));

  const service = app.service("events");

  service.hooks(hooks);
};

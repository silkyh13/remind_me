const cron = require("node-cron");
const moment = require("moment-timezone");
const sendEmail = require("./sendEmail.js");
const updateEvent = require("./updateEvent");
module.exports = (model) => {
  cron.schedule("* * * * *", async () => {
    //matching userId from the events collection to _id of users collection
    const events = await model.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);
    //send email to anyone that has an event thats 30 mins away
    //loop through events. events is an array of event obj

    let listOfEvents = events.filter((event) => {
      let currentTime = moment(new Date())
        .tz(event.timeZone)
        .format("DD/MM/YYYY HH:mm:ss");
      let baptized = moment(new Date(event.startTime)).format(
        "DD/MM/YYYY HH:mm:ss"
      );

      let difference = moment(baptized, "DD/MM/YYYY HH:mm:ss").diff(
        moment(currentTime, "DD/MM/YYYY HH:mm:ss"),
        "minutes"
      );

      return (
        event.user[0] &&
        event.user[0].needReminder &&
        !event.sentReminder &&
        difference <= 30 &&
        difference > 0
      );
    });

    for (let i = 0; i < listOfEvents.length; i++) {
      updateEvent(model, listOfEvents[i]._id);
      sendEmail(
        listOfEvents[i].user[0].email,
        listOfEvents[i].title,
        listOfEvents[i].description
      );
    }
  });
};

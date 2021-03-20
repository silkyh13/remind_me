const cron = require("node-cron");
const moment = require("moment");
const sendEmail = require("./sendEmail.js");
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
    let currentTime = moment(new Date());

    let listOfEvents = events.filter((event) => {
      let baptized = moment(new Date(event.startTime));
      console.log(
        event.title,
        baptized,
        baptized.diff(currentTime, "minutes"),
        "hoo"
      );
      return baptized.diff(currentTime, "minutes") > 0;
      // return (
      //   baptized.diff(currentTime, "minutes") <= 30 &&
      //   baptized.diff(currentTime, "minutes") > 0
      // );
    });
    for (let i = 0; i < listOfEvents.length; i++) {
      console.log(listOfEvents[i], listOfEvents[i].user[0].email);
      // sendEmail(listOfEvents[i].user[0].email)
    }
  });
};

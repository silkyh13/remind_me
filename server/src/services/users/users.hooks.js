const { authenticate } = require("@feathersjs/authentication").hooks;
const { ObjectId } = require("mongoose").Types;
module.exports = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

// function reminder() {
// console.log("heererrrrrrr");
// return async (context) => {
// console.log("herehereh");
// if (context.params.query === "edit_reminder") {
// const { user } = context.params;
// console.log("nade it here", user);
// context.data.needReminder = context.params.query.reminder;
// return context;
// }
// };
// }

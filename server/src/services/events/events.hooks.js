const { authenticate } = require("@feathersjs/authentication").hooks;
const { ObjectID } = require("mongodb");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [getUserEvents()],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [addEventToUser()],
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

function addUserToEvent() {}

function addEventToUser() {
  return async (context) => {
    const { user } = context.params;

    //go to the collection
    //find the user id
    //and add the event id to user.events
    console.log(user, "This is the user");
    console.log(context.result, "This is the event");
    //user = the user object
    //updating user object so it has the additional event
    try {
      await context.app.service("users").patch(user._id, {
        events: [...user.events, context.result._id],
      });
      console.log("SUCCESS?");
    } catch (err) {
      console.log(err);
    }
  };
}

function getUserEvents() {
  return async (context) => {
    //returns user with event field populated
    const userWithEvents = await context.app
      .service("users")
      .options.Model.aggregate([
        {
          $match: {
            _id: new ObjectID(context.params.user._id),
          },
        },
        // e.g.
        // {
        //    $lookup:
        //    {
        //      from: <collection to join>,
        //      localField: <field from the input documents>,
        //      foreignField: <field from the documents of the "from" collection>,
        //      as: <output array field>
        //    }
        // }
        {
          $lookup: {
            from: "events",
            localField: "events",
            foreignField: "_id",
            as: "events",
          },
        },
      ]);
    //actualy events that corresponds to the event id
    context.result = userWithEvents[0].events;
    return context;
  };
}

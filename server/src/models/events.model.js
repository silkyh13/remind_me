// events-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const { ObjectId } = require("mongoose").Types;
module.exports = function (app) {
  const modelName = "events";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      title: { type: String, required: true },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
      description: { type: String },
      allDay: { type: Boolean },
      userId: { type: ObjectId },
      timeZone: { type: String },
      sentReminder: { type: Boolean },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};

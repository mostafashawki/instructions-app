// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  // const Schema = new mongooseClient.Schema;
  const { Schema } = mongooseClient;
  const schema = new mongooseClient.Schema(
    {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String, unique: true, lowercase: true },
      password: { type: String },
      roles: { type: [String], required: true, enum: ['q-m', 'w'] },
      isVerified: { type: Boolean, default: false },
      verifyToken: { type: String },
      verifyExpires: { type: Date },
      verifyChanges: {
        type: Array,
      },
      resetToken: { type: String },
      resetExpires: { type: Date },
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

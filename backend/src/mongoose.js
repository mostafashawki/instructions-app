const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = function (app) {
  console.log('mongo db:', app.get('mongodb'));

  mongoose
    .connect(app.get('mongodb'), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .catch((err) => {
      logger.error(err);
      process.exit(1);
    });

  app.set('mongooseClient', mongoose);
};

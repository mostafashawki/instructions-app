const users = require('./users/users.service.js');
const authManagement = require('./auth-management/auth-management.service.js');
const tasks = require('./tasks/tasks.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(authManagement);
  app.configure(tasks);
};

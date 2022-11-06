const { generateId } = require('../../utils');

exports.generateUsersTasks = async ({ app, infoLevel = 0 } = {}) => {
  const users = [
    {
      _id: generateId(),
      email: 'manager@test.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'secret',
      roles: ['q-m'],
      workspace: null,
      isVerified: true,
    },
    {
      _id: generateId(),
      email: 'worker@test.com',
      firstName: 'Randy',
      lastName: 'Vargas',
      password: 'secret',
      roles: ['w'],
      workspace: null,
      isVerified: true,
    },
  ];

  const tasks = [
    {
      _id: generateId(),
      title: 'Task with instructions',
      instructions: ['instruction 1', 'instruction 1'],
      createdBy: users[0]._id,
      lastEditBy: users[0]._id,
    },
  ];

  await app.service('users').create(users);
  if (infoLevel >= 1) console.log(`✅ ${users.length} users created.`);

  await app.service('tasks').create(tasks);
  if (infoLevel >= 1) console.log(`✅ ${tasks.length} tasks created.`);

  return { users, tasks };
};

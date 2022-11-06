const app = require('../src/app');

const { resetDb, getDateWithDayOffset } = require('../utils');
const { generateUsersTasks } = require('./generators/generate-users-tasks.js');

Promise.all([main()]).then(() => {
  process.exit();
});

async function main() {
  app.setup();

  const infoLevel = 1; // 0 = no logs, 1 = only summary logs, 2 = data + summary logs

  // Set data start date (=> 365 days ago)
  let startAt = getDateWithDayOffset(new Date(), -365);
  console.log(`🕑 Data starts at ${startAt.toISOString()}`);

  // Reset data base collections
  await resetDb(app);

  if (infoLevel >= 1) console.log('---------------- Create Tasks ----------------------');
  const { users, workspaces } = await generateUsersTasks({ app, infoLevel });

  if (infoLevel >= 1) console.log('---------------- Done ------------------------------------------');
}

const { faker } = require('@faker-js/faker');
const { getDateWithDayOffset, randomInt, randomString, getName } = require('../utils/utils.js');

const { schemas } = require('./loads-schemas.js');
const { createDataIV } = require('./generate-data-i-v.js');

// Some possible process sequences
const processSequences = {
  all: ['ultrasonic_bath', 'chemical_treatment', 'pecvd', 'solar_simulator'],
  just_cleaning: ['ultrasonic_bath', 'chemical_treatment'],
  test: ['solar_simulator'],
};

exports.generateLoads = async ({ app, carriers, startAt, infoLevel = 0, user }) => {
  // 1. Create loads schema

  schemas.map((schema) => (schema.validAt = startAt));

  if (infoLevel >= 2) {
    console.log('Loads data schemas:');
    console.dir(schemas, { depth: null });
  }

  for (const schema of schemas) {
    await app.service('data-schemas').create(schema, { user });
  }
  if (infoLevel >= 1) console.log(`✅ ${schemas.length} load schemas created.`);

  const uploads = [];
  for (const carrier of carriers) {
    let processAt = getDateWithDayOffset(carrier.data.deliveredAt, randomInt(1, 10)); // Start some days after the wafer has been delivered

    for (const process of processSequences['all']) {
      processAt = getDateWithDayOffset(processAt, randomInt(1, 5));
      const uploadData = {
        carriers: [{ name: carrier.name }],
        load: {
          schemaLabel: process,
          dataAt: new Date(processAt),
          data: getLoadData(process),
        },
      };

      await app.service('upload').create(uploadData, { user });
      uploads.push(uploadData);
    }
  }

  if (infoLevel >= 2) {
    console.log('Uploads data:');
    console.dir(uploads, { depth: null });
  }

  if (infoLevel >= 1) console.log(`✅ ${uploads.length} uploads created.`);
  return uploads;
};

function getLoadData(process) {
  switch (process) {
    case 'ultrasonic_bath':
      return {
        operator: getName(1),
        device: randomString(['Miele Clean2000', 'Ultrasonic Super Cleaner']),
        temperature: randomInt(1, 4) * 25,
        duration: randomInt(1, 4) * 15,
        frequency: randomInt(1, 6) * 5000 + 20000,
        detergent: randomString(['Water', 'Methanol', 'Propanol']),
        detergent_date: '2022-01-10',
      };
      break;
    case 'chemical_treatment':
      return {
        operator: getName(2),
        temperature: randomInt(1, 6) * 25,
        duration: randomInt(1, 4) * 15,
        detergent: randomString(['HCl', 'HF', 'KOH', 'H3PO4']),
      };
      break;
    case 'pecvd':
      return {
        operator: getName(3),
        sequence: faker.lorem.slug(),
      };
      break;
    case 'solar_simulator':
      const data = createDataIV();
      data.operator = getName(5);
      return data;
      break;
    default:
      return {};
      break;
  }
}

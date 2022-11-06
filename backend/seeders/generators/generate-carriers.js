const { getName } = require('../utils/utils.js');

exports.generateCarriers = async ({ app, number = 5, startAt, infoLevel = 0, user } = {}) => {
  // 1. Create carrier schema
  const schemas = [
    {
      key: 'wafer',
      type: 'Carrier',
      label: { en: 'wafer' },
      validAt: startAt,
      fields: [
        {
          key: 'operator',
          type: 'String',
          label: 'Operator',
        },
        {
          key: 'deliverer',
          type: 'String',
          label: 'Deliverer',
        },
        {
          key: 'deliveredAt',
          type: 'Date',
          label: 'Delivered at',
        },
      ],
      fieldsGui: '',
    },
  ];

  if (infoLevel >= 2) {
    console.log('Carriers data schemas:');
    console.dir(schemas, { depth: null });
  }

  for (const schema of schemas) {
    const result = await app.service('data-schemas').create(schema, { user });
    schema._id = result._id;
  }
  if (infoLevel >= 1) console.log(`✅ ${schemas.length} carrier schemas created and uploaded.`);

  // // 2. Create carriers
  const carriers = [];
  const deliveredAt = new Date(startAt).toISOString().substring(0, 10);
  let count = 1;
  while (carriers.length < number) {
    const carrier = {
      //dataSchema: schemaRes._id,
      name: 'Wafer ' + 12345 + count,
      dataSchema: schemas[0]._id,
      data: {
        operator: getName(0),
        deliverer: 'Solar Wafer Delivery24',
        deliveredAt: deliveredAt,
      },
    };

    carriers.push(carrier);
    count++;
  }
  if (infoLevel >= 2) {
    console.log('Carriers data:');
    console.dir(carriers, { depth: null });
  }

  for (const carrier of carriers) {
    await app.service('carriers').create(carrier, { user });
  }
  if (infoLevel >= 1) console.log(`✅ ${carriers.length} carriers created and uploaded.`);

  return carriers;
};

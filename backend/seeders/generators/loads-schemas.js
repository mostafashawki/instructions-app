const schemas = [
  {
    key: 'ultrasonic_bath',
    label: { en: 'Ultrasonic Bath' },
    type: 'Load',
    fields: [
      { key: 'operator', type: 'String', label: 'Operator' },
      { key: 'device', type: 'String', label: 'Device' },
      { key: 'temperature', type: 'Double', label: 'Temperatur', unit: '°C' },
      { key: 'duration', type: 'Double', label: 'Duration', unit: 'sec' },
      { key: 'frequency', type: 'Double', label: 'Drequency', unit: 'Hz' },
      { key: 'detergent', type: 'String', label: 'Detergent' },
      { key: 'detergent_date', type: 'Date', label: 'Detergent date' },
    ],
    fieldsGui: '',
  },
  {
    key: 'chemical_treatment',
    label: { en: 'Chemical Treatment' },
    type: 'Load',
    fields: [
      { key: 'operator', type: 'String', label: 'Operator' },
      { key: 'temperature', type: 'Double', label: 'Temperatur', unit: '°C' },
      { key: 'duration', type: 'Double', label: 'Duration', unit: 'sec' },
      { key: 'detergent', type: 'String', label: 'Detergent' },
    ],
    fieldsGui: '',
  },
  {
    key: 'pecvd',
    label: { en: 'PECVD' },
    type: 'Load',
    fields: [
      { key: 'operator', type: 'String', label: 'Operator' },
      { key: 'sequence', type: 'String', label: 'Sequence' },
    ],
    fieldsGui: '',
  },
  {
    key: 'solar_simulator',
    label: { en: 'Solar Simulator' },
    type: 'Load',
    fields: [
      { key: 'operator', type: 'String', label: 'Operator' },
      { key: 'j_sc', type: 'Double', label: 'Jsc', unit: 'mA/cm²' },
      { key: 'v_oc', type: 'Double', label: 'Voc', unit: 'V' },
      { key: 'ff', type: 'Double', label: 'FF', unit: '%' },
      { key: 'eta', type: 'Double', label: 'Eta', unit: '%' },
      { key: 'j_mpp', type: 'Double', label: 'mA/cm²' },
      { key: 'v_mpp', type: 'Double', label: 'V' },
      {
        key: 'iv',
        type: 'DataTable',
        label: 'I-V characteristics',
        definitions: [
          { key: 'voltages', type: 'Double', label: 'U', unit: 'V' },
          { key: 'current_densities', type: 'Double', label: 'J', unit: 'mA/cm²' },
        ],
      },
    ],
    fieldsGui: '',
  },
];

module.exports = {
  schemas,
};

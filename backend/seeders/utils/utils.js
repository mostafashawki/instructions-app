const { faker } = require('@faker-js/faker');

faker.locale = 'de';
faker.seed(12345);

// Faked names
const names = [...Array(100)].map((_, i) => {
  return faker.name.firstName() + ' ' + faker.name.lastName();
});

// Return a faked name
module.exports = {
  getName: function (index) {
    if (names[index]) {
      return names[index];
    }
    return names[this.randomInt(0, names.length - 1)];
  },

  // Returns a new date with an day offset
  getDateWithDayOffset: function (date, offsetDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + offsetDays);
    return new Date(newDate);
  },

  // Rounds a number
  round: function (value, digits) {
    return Math.round(value * 10 ** digits) / 10 ** digits;
  },

  // Returns a random integer number
  randomInt: function (start = 0, end = 10) {
    return Math.round(Math.random() * (end - start)) + start;
  },

  // Returns a random float number
  randomFloat: function (start = 0, end = 10) {
    return Math.random() * (end - start) + start;
  },

  // Returns a random string from an array of strings
  randomString: function (strings) {
    const index = Math.round(Math.random() * (strings.length - 1));
    return strings[index];
  },
};

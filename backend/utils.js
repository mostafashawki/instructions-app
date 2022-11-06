async function resetDb(app) {
  console.log('resetDb called');
  try {
    await app.service('tasks').remove(null, {});
    await app.service('users').remove(null, {});
  } catch (err) {
    console.log(err);
  }

  console.log('resetDb finished');
  // return 'done';
}
function getLogoLink(app) {
  const url = app.get('publicurl').replace(/\/$/, '') + '/img/logo.png';
  return encodeURI(url);
}

function generateId() {
  var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    'xxxxxxxxxxxxxxxx'
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
}

const getDate = {
  date: new Date(),
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  addYear: function (num) {
    return new Date(this.year + num, this.month, this.day);
  },
  addMonth: function (num) {
    return new Date(this.year, this.month + num, this.day);
  },
  subtractYear: function (num) {
    return new Date(this.year - num, this.month, this.day);
  },
};

function getDateWithDayOffset(date, offsetDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + offsetDays);
  return new Date(newDate);
}

const regexKey = /^[a-z-0-9\_\-]+$/;
const isKeyValid = (val) => (regexKey.test(val) ? true : false);

module.exports = { resetDb, generateId, getDate, getDateWithDayOffset, isKeyValid, getLogoLink };

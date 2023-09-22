const fp = require('fastify-plugin');

function isDateValid(dateString) {
  const dateParts = dateString.split('-');
  if (dateParts.length !== 3) {
    return false;
  }

  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const day = parseInt(dateParts[2], 10);

  if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
    return false;
  }

  const date = new Date(year, month - 1, day);

  return date.getFullYear() === year
    && date.getMonth() === month - 1
    && date.getDate() === day;
}

async function date(fastify, opts) {
  fastify.decorate('date', {
    isDateValid,
  });
}

module.exports = fp(date);

const locale = process.env.LOCALE || 'en_us';

switch (locale) {
    default:
        module.exports = require('./english');
        break;
}
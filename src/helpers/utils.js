const knex = require('../databases')
const parseExpireTime = (expireTime) => {
    const timeUnit = expireTime.slice(-1);
    const timeValue = parseInt(expireTime.slice(0, -1));

    switch (timeUnit) {
        case 's':
            return timeValue;
        case 'm':
            return timeValue * 60;
        case 'h':
            return timeValue * 60 * 60;
        case 'd':
            return timeValue * 24 * 60 * 60;
        default:
            throw new Error('Invalid time format');
    }
};

const generateNIP = async () => {
    const year = new Date().getFullYear();
    const data = await knex('karyawan').where('nip', 'like', `${year}%`).count('id as count');
    const newCount = data[0].count + 1;
    return `${year}${String(newCount).padStart(4, '0')}`;
};

module.exports = {
    parseExpireTime,
    generateNIP
}
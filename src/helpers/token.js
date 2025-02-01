const jwt = require('jsonwebtoken');
const utils = require('./utils');
require('dotenv').config();

const createUserToken = (user) => {
    return {
        token: jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.JWT_EXPIRE_TIME
        }),
        expiresAt: new Date(Date.now() + utils.parseExpireTime(process.env.JWT_EXPIRE_TIME) * 1000)
    }
}

module.exports = {
    createUserToken
}
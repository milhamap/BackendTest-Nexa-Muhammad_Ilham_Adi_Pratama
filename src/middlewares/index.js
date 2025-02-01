const knex = require('../databases')
const jwt = require('jsonwebtoken');
const {decode} = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
    verifyToken: (req, res, next) => {
        const token = req.headers['authorization'];
        const authToken = token && token.split(' ')[1];
        if (!authToken) return res.sendStatus(401);
        if (Date.now() >= decode(authToken).exp * 1000) return res.sendStatus(403);
        jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        })
    },
    log: async (req, res, next) => {
        const userId = req.user ? req.user : '';
        const api = req.originalUrl;
        const request = JSON.stringify(req.body);
        const response = JSON.stringify(res.locals.responseData);

        try {
            await knex('log_trx_api').insert({
                user_id: userId,
                api: api,
                request: request,
                response: response,
                insert_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
            });
        } catch (error) {
            console.error('Error logging transaction:', error);
        }

        next();
    }
}
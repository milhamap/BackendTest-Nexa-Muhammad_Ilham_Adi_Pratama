const knex = require('../databases');
const Validator = require('fastest-validator')
// const bcrypt = require('bcrypt');
const { createUserToken } = require('../helpers/token')
const {ResponseFormatter} = require('../helpers/response');
require('dotenv').config()

const v = new Validator();

module.exports = {
    login: async(req, res) => {
        let userToken, accessToken
        const schema = {
            username: { type: 'string', empty: false },
            password: { type: 'string', empty: false, min: 6 },
        }

        const validate = v.validate(req.body, schema);

        if (validate.length) {return ResponseFormatter(res, 400, validate[0].message, 'error')}
        const trx = await knex.transaction();
        try {
            const admin = await knex('admin')
                .where({username: req.body.username})
                .first();
            if (!admin) {
                return ResponseFormatter(res, 400, 'Account not found', 'error')
            }
            // const isPasswordMatch = await bcrypt.compare(req.body.password, admin.password.toString('utf-8'));
            // if (!isPasswordMatch) {return ResponseFormatter(res, 400, 'Password is incorrect', 'error')}
            const availableToken = await knex('admin_token')
                .where({id_admin: admin.id})
                .andWhere("expired_at", ">", new Date())
                .first()
            if (!availableToken) {
                userToken = createUserToken({
                    id: admin.id,
                    username: admin.username,
                })
                accessToken = userToken.token
                await knex('admin_token')
                    .insert({
                        id_admin: admin.id,
                        token: userToken.token,
                        expired_at: userToken.expiresAt,
                    })
            } else {
                accessToken = availableToken.token
            }
            res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'none' });
            await trx.commit();
            return ResponseFormatter(res, 200, 'Login successfully', 'success', { token: accessToken });
        } catch (error) {
            await trx.rollback();
            return ResponseFormatter(res, 500, error.message, 'error');
        }
    },
    logout: async(req, res) => {
        res.clearCookie('accessToken');
        return ResponseFormatter(res, 200, 'Logout successfully');
    },
    getUser: async(req, res) => {
        const user = await knex('admin').where({ id: req.user.id }).first();
        return ResponseFormatter(res, 200, 'Get user data successfully', 'success', {id: user.id, username: user.username});
    }
}
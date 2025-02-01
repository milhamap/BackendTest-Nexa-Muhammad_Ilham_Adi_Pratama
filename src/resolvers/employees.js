const knex = require('../databases');
const utils = require('../helpers/utils');
// const bcrypt = require('bcrypt');
const Validator = require('fastest-validator')
const {ResponseFormatter, ResponseFormatterPagination} = require('../helpers/response');
const sharp = require("sharp");
require('dotenv').config()

const v = new Validator();

module.exports = {
    createEmployee: async (req, res) => {
        const schema = {
            name: {
                type: 'string',
                empty: false,
                pattern: /^[a-zA-Z\s]+$/
            },
            address: {
                type: 'string',
                empty: false,
                pattern: /^[a-zA-Z0-9\s,.-]+$/
            },
            gender: {
                type: 'string',
                empty: false,
                pattern: /^[LP]$/
            },
            birthday: {
                type: 'string',
                empty: false,
                pattern: /^\d{4}-\d{2}-\d{2}$/
            },
        };

        const validate = v.validate(req.body, schema);

        if (validate.length) {return ResponseFormatter(res, 400, validate[0].message, 'error')}
        const trx = await knex.transaction()
        try {
            const compressedImageBuffer = await sharp(req.files.photo[0].buffer)
                .resize(200)
                .toBuffer();
            const data = {
                id: 1,
                nip: await utils.generateNIP(),
                nama: req.body.name,
                alamat: req.body.address,
                gend: req.body.gender,
                tgl_lahir: req.body.birthday,
                photo: compressedImageBuffer.toString('base64'),
                status: 1,
                insert_by: req.user.username,
                insert_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
            }
            await knex('karyawan')
                .insert(data)
            await trx.commit();
            return ResponseFormatter(res, 200, 'Employee successfully added!', 'success', data);
        } catch (error)  {
            await trx.rollback();
            return ResponseFormatter(res, 500, error.message, 'error');
        }
    },
    getListEmployee: async (req, res) => {
        const {
            keyword,
            start,
            count
        } = req.query;
        const trx = await knex.transaction()
        try {
            let query = knex('karyawan')
            if (keyword) query = query.whereRaw('LOWER(nama) LIKE ?', [`%${keyword.toLowerCase()}%`]);
            const counts = await query.clone().count('id as count').first()
            if (start) query = query.offset(parseInt(start))
            if (count) query = query.limit(parseInt(count))
            const results = await query
            const metadata = {
                total_data: counts.count,
                total_page: Math.ceil(counts.count/parseInt(count)),
                quantity: parseInt(count),
                page: Math.floor(parseInt(start)/parseInt(count)+1),
            }
            await trx.commit()
            if (results.length === 0) return ResponseFormatter(res, 404, "Employee Not Found.", "error")
            return ResponseFormatterPagination(res, 200, 'Employee Not Found', "success", results, metadata)
        } catch (error)  {
            await trx.rollback();
            return ResponseFormatter(res, 500, error.message, 'error')
        }
    },
    updateEmployee: async (req, res) => {
        const schema = {
            name: {
                type: 'string',
                pattern: /^[a-zA-Z\s]+$/
            },
            address: {
                type: 'string',
                pattern: /^[a-zA-Z0-9\s,.-]+$/
            },
            gender: {
                type: 'string',
                pattern: /^[LP]$/
            },
            birthday: {
                type: 'string',
                pattern: /^\d{4}-\d{2}-\d{2}$/
            },
        };

        const validate = v.validate(req.body, schema);

        if (validate.length) {return ResponseFormatter(res, 400, validate[0].message, 'error')}
        const trx = await knex.transaction()
        try {
            let data = {
                nama: req.body.name,
                alamat: req.body.address,
                gend: req.body.gender,
                tgl_lahir: req.body.birthday,
                update_by: req.user.username,
                update_at: new Date().toISOString().slice(0, 19).replace('T', ' '),
                photo: ''
            }
            if (req.files.photo.length > 0) {
                const compressedImageBuffer = await sharp(req.files.photo[0].buffer)
                    .resize(200)
                    .toBuffer();
                data.photo = compressedImageBuffer.toString('base64');
            }
            await knex('karyawan')
                .update(data).where({nip: req.params.nip})
            await trx.commit();
            return ResponseFormatter(res, 200, 'Employee successfully updated!', 'success', data);
        } catch (error)  {
            await trx.rollback();
            return ResponseFormatter(res, 500, error.message, 'error');
        }
    },
    nonActivateEmployee: async (req, res) => {
        const trx = await knex.transaction()
        try {
            const result = await knex('karyawan').update({ status: 9 }).where({nip: req.params.nip})
            if (result != 1) return ResponseFormatter(res, 404, "Failed Non Activated Employee!", "error")
            await trx.commit()
            return ResponseFormatter(res, 200, 'Success Non Activated Employee!', 'success');
        } catch (error)  {
            await trx.rollback();
            return ResponseFormatter(res, 500, error.message, 'error');
        }
    }
}

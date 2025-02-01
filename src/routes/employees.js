const express = require('express');
const { verifyToken, log } = require('../middlewares');
const { createEmployee, imageValidate, getListEmployee, updateEmployee, nonActivateEmployee } = require('../resolvers/employees');

const router = express.Router();

router.get('/photo', log, verifyToken, imageValidate);
router.post('/', log, verifyToken, createEmployee);
router.get('/', log, verifyToken, getListEmployee);
router.put('/:nip', log, verifyToken, updateEmployee);
router.put('/:nip/non-activate', log, verifyToken, nonActivateEmployee);

module.exports = router;
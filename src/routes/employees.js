const express = require('express');
const { verifyToken, log } = require('../middlewares');
const { createEmployee, getListEmployee, updateEmployee, nonActivateEmployee } = require('../resolvers/employees');

const router = express.Router();

router.post('/', log, verifyToken, createEmployee);
router.get('/', log, verifyToken, getListEmployee);
router.put('/:nip', log, verifyToken, updateEmployee);
router.put('/:nip/non-activate', log, verifyToken, nonActivateEmployee);

module.exports = router;
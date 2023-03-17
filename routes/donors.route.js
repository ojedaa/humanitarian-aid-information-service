/*
 * @Author: Allan Ojeda
 * @Date: 2023-03-14 21:51:46
 * @Last Modified by: Allan Ojeda
 * @Last Modified time: 2023-03-17 11:35:06
 */

const { Router } = require('express')
const { getDonors } = require('../controllers/donors.controller')

const router = Router()

router.get('/resume', getDonors)

module.exports = router

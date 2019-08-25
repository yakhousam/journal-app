const router = require('express').Router()

const api = require('./api')
const userRoute = require('./user_route')


router.use(api, userRoute)

module.exports = router;
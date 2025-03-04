const express = require('express')
const router = express.Router()

const { verifyToken } = require('../middlewares/verifyToken')
const { getCustFeed, addCustFeed, updateCustFeed, dltCustFeed } = require('../controllers/custController')

router.get('/feedback', verifyToken, getCustFeed)
router.get('/feedback/:id', verifyToken, getCustFeed)
router.post('/feedback', verifyToken, addCustFeed)
router.put('/feedback/:id', verifyToken, updateCustFeed)
router.delete('/feedback/:id', verifyToken, dltCustFeed)


module.exports = router;
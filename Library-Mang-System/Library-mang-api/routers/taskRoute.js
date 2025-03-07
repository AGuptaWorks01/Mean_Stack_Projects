const express = require('express')
const { addBook, updateBook, getBook, deleteBook } = require('../Controller/taskController.js')
const { verifyToken } = require('../utils/verifytoken.js')
const router = express.Router();

router.post('/addBook',verifyToken, addBook)
router.get('/getBook',verifyToken, getBook)
router.get('/getBook/:id',verifyToken, getBook)
router.put('/updateBook/:id',verifyToken, updateBook)
router.delete('/dltBook/:id',verifyToken, deleteBook)

module.exports = router;
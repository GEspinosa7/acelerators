const express = require('express');
const { createAcelerator, listAcelerators, getAcelerator, updateAcelerator, deleteAcelerator } = require('./controllers/acelerators');

const router = express();

router.post('/acelerator', createAcelerator);
router.get('/acelerator', listAcelerators);
router.get('/acelerator/:id', getAcelerator);
router.put('/acelerator/:id', updateAcelerator);
router.delete('/acelerator/:id', deleteAcelerator);

module.exports = router;
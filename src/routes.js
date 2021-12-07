const express = require('express');
const { createAcelerator, listAcelerators, getAcelerator, updateAcelerator, deleteAcelerator } = require('./controllers/acelerators');
const { getTypesList, getModulesList } = require('./controllers/values_list');

const router = express();

router.post('/acelerator', createAcelerator);
router.get('/acelerator', listAcelerators);
router.get('/acelerator/:id', getAcelerator);
router.put('/acelerator/:id', updateAcelerator);
router.delete('/acelerator/:id', deleteAcelerator);

router.get('/types', getTypesList);
router.get('/modules', getModulesList);

module.exports = router;
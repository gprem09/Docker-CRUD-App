const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/mainController');

router.get('/', dashboardController.dashboard);
router.get('/item/:id', dashboardController.dashboardViewNote);
router.post('/item/:id', dashboardController.dashboardUpdateNote);
router.delete('/item-delete/:id', dashboardController.dashboardDeleteNote);
router.get('/add', dashboardController.dashboardAddNote);
router.post('/add', dashboardController.dashboardAddNoteSubmit);

module.exports = router;
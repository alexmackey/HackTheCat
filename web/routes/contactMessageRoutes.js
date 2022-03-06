const express = require('express'),
    router = express.Router(),
    contactMessageService = require('../services/contactMessageService');

router.post('/send-message', async function (req, res) {

    contactMessageService.add(req.body.message);
    res.redirect('/?message=Thank+you+for+your+message.+We+will+get+back+to+you+soon.');

});

module.exports = router;
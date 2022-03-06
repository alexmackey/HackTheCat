const express = require('express'),
    router = express.Router(),
    userService = require('../services/userService');
    
router.get('/update-profile', async function (req, res) {

    if(!req.session.isLoggedIn){
        res.redirect('/');
        return;
    }

    res.render('pages/changeProfile', {
        isLoggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
        email: req.session.email,
        username: req.session.username,
        changePasswordMessage: req.query.message || ''
    });

});

router.post('/update-profile', async function (req, res) {

    const email = req.body.email;
    const username = req.body.username;
    const userId = req.session.userId;

    userService.updateProfile(email, username, userId);

    req.session.email = email;
    req.session.username = username;

    res.redirect('/');
});

router.post('/change-password', async function (req, res) {

    const newPassword = req.body.newPassword;
    const confirmNewPassword = req.body.confirmNewPassword;

    if (newPassword == '' || confirmNewPassword == '') {
        console.log('Empty password');
        res.redirect('change-password?message=Please+Enter+Password');
        return;
    }

    if (newPassword != confirmNewPassword) {
        console.log('Passwords do not match');
        res.redirect('change-password?message=Passwords+Do+Not+Match');
        return;
    }

    const userId = req.session.userId;

    userService.updatePassword(newPassword, userId);

    res.redirect('/');
});

module.exports = router;
const express = require('express'),
    router = express.Router(),
    userService = require('../services/userService'),
    cookieParser = require("cookie-parser"),
    sessions = require('express-session');

router.get('/', async function (req, res) {

    session=req.session;

    res.render('pages/signin', {
        isLoggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
        email: req.session.email,
        message: req.query.message || ''
    });

});

router.post('/signin', async function (req, res) {

    const results = await userService.signin(req.body.username, req.body.password);

    if (results.length > 0) {
        console.log("success logged in")

        req.session.isLoggedIn=true;
        req.session.userId=results[0].UserId;
        req.session.username=results[0].Username;
        req.session.email=results[0].Email;
        req.session.isAdmin=results[0].IsAdmin;

        console.log(req.session.email);

        res.redirect('/');
        return;
    }

    console.log("failed logged in")
    res.redirect('./?message=Invalid+Login');
});

router.get('/signout', async function (req, res) {
    
    req.session.destroy();

    res.redirect('/');
});

module.exports = router;
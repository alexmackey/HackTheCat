const express = require('express'),
    router = express.Router(),
    productService = require('../services/productService'),
    commentService = require('../services/commentService'),
    textContentService = require('../services/textContentService'),
    pug = require('pug'),
    sessions = require('express-session');

router.get('/', async function (req, res) {

    const orderByClause = req.query.orderByClause || 'productName';
    const products = await productService.getAll(orderByClause);
    const textContentResults = await textContentService.getWelcomeText();
    const welcomeMessage = pug.render(textContentResults[0].WelcomeMessage);

    res.render('pages/home', {
        greeting: req.query.greeting || '',
        data: products,
        isLoggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
        email: req.session.email,
        welcomeMessage: welcomeMessage
    });

});

router.get('/detail', async function (req, res) {

    const productId = req.query.productId;
    productData = await productService.get(productId);
    commentData = await commentService.get(productId);

    //res.set("Content-Security-Policy", "default-src 'self' script-src 'nonce-allow-block'");

    res.render('pages/detail', {
        productData: productData,
        commentData: commentData,
        isLoggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
        email: req.session.email
    });
});

router.post('/write-a-review', async (req, res) => {

    const productId = req.body.productId;
    const comment = req.body.comment;

    await commentService.add(productId, comment);
    res.redirect('/detail?productId=' + productId);
});

router.post('/delete-comments', async (req, res) => {

    await commentService.deleteAll();
    res.redirect('/detail?productId=1');
});

router.get('/contact', function (req, res) {
    res.render('pages/contact',
        {
            isLoggedIn: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin,
            email: req.session.email
        });
});

router.get('/redirector', async (req, res) => {    
    res.redirect(req.query.url);
});

module.exports = router;
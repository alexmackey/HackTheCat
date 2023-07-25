const express = require('express'),
      router = express.Router(),
      serialize = require('node-serialize'),
      productService = require('../services/productService'),
      userService = require('../services/userService'),
      textContentService = require('../services/textContentService');
      path = require('path');

const { exec } = require("child_process");

router.get('/home', async function (req, res) { 
  
    if(!req.session.isAdmin){
        res.send("Not authorized"); 
        return;       
    }
    
    const textContentResults = await textContentService.getWelcomeText();

    res.render('pages/admin', {
        welcomeMessage: textContentResults[0].WelcomeMessage,   
        isLoggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
        email: req.session.email
    });
    
});

router.post('/update-message', function (req, res) { 
    const welcomeMessage = req.body.welcomeMessage;
    textContentService.updateWelcomeText(welcomeMessage);
    res.send("Message Updated");
});

router.get('/get-image', function (req, res) {
    
    var imageFile = path.join(__dirname, req.query.imageName);
    console.log(imageFile);
    res.sendFile(imageFile);
});

router.post('/upload-product', async function (req, res) {    
   
    console.log('Uploading product');
    console.log(req.body.Product);

    var product = serialize.unserialize(req.body.Product);
    productService.add(product);

    res.send("Product Uploaded");
});

router.post('/upload-images', (req, res) => {
    try {
        
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let myFile = req.files.myFile;

            myFile.mv(path.join(__dirname, "../uploads/" + myFile.name));

            res.send({
                status: true,
                message: 'File uploaded'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/getuser', async function (req, res) {   

    users = await userService.get(req.query.username)
    res.send(users);     
});

router.post('/pingcheck', (req, res) => {
    
    var ipAddress = req.body.ipAddress;
    console.log(ipAddress);

    exec("ping -c 3 " + ipAddress, (error, stdout, stderr) => {

        if (error) {
            res.send(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            res.send(`stderr: ${stderr}`);
            return;
        }
        res.send(`stdout: ${stdout}`);
    });

});

module.exports = router;
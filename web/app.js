const dotenv=require('dotenv').config();
const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const path = require('path');

const adminRoutes = require('./routes/adminRoutes');
const homeRoutes = require('./routes/homeRoutes');
const signinRoutes = require('./routes/signinRoutes');
const userProfileRoutes = require('./routes/userProfileRoutes');
const contactMessageRoutes = require('./routes/contactMessageRoutes');

const app = express();
const port = process.env.PORT || 3000;
const oneDay = 1000 * 60 * 60 * 24;
const sessions = require('express-session');

app.use(morgan('dev'));


app.use(sessions(
  { path: '/', 
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: false },
  maxAge: oneDay,
  sameSite: false }
));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));

app.use('/assets', express.static(path.join(__dirname, "assets")));

app.use('/', homeRoutes);
app.use('/admin/', adminRoutes);
app.use('/signin/', signinRoutes);
app.use('/user/', userProfileRoutes);
app.use('/contactMessage/', contactMessageRoutes);

app.listen(port, () => {
  console.log(`Hackthecat app listening on port ${port}`)
});
const express = require('express');
const path = require('path');
const passport = require('passport');
const session = require('express-session')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');

const app = express();

// passport config
require('./config/passport')(passport);

// db config
const db = require('./config/keys').mongoURI;

// connect to mongoDB
mongoose
 .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => {
    console.log('Connected to MongoDB');
  })
 .catch((err) => {
    console.log(err)});

// const publicDirectory = path.join(__dirname, 'public');
// app.use(express.static(publicDirectory));

app.use(express.static(path.join(__dirname, "public")))

// app.set('view engine', 'hbs');

app.use(expressLayouts);
app.set('view engine', 'ejs');

// express body parser
app.use(express.urlencoded({ extended: true }));

// express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect flash
  app.use(flash());
  
  // Global variables
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });
  


// routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

// app.listen(5000, () => {
//     console.log("server started on port 5000");
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
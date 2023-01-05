const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// expresss body parser
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

app.listen(PORT, console.log(`Server running on ${PORT}`));
require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const methodOverride = require('method-override');

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

connectDB();

app.use(express.static('public'));

app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
 
app.use('/',require('./server/routes/index'));

app.get('*', function(req, res) {
    res.status(404).render('404');
  })
  
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
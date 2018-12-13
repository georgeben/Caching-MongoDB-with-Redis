const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const bps = require('body-parser');

//Routes
const indexRouter = require('./routes/index');
const addBookRouter = require('./routes/addBook');

const port = 3000;
const dbUrl = 'mongodb://localhost:27017/local-library';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
});

const db = mongoose.connection;
db.on('connected', () => console.log('Database connected successfully'));
db.on('error', () => console.log('Failed to connect to database'));

const app = express();

app.use(logger('dev'));

app.use(bps.urlencoded({extended:false}));
app.use(bps.json());

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', indexRouter);

app.use('/add', addBookRouter);

app.use((req, res, next) => {
    res.send('The page you are trying to view doesnt exist');
});

app.use((err, req, res, next) =>{
    res.send(`An error occured: ${err.message}`)
});

const server = app.listen(port, () => console.log(`App started on PORT ${server.address().port}`))




const express = require('express');
const mongoose = require('mongoose');
const app = express();
var cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");

mongoose.connect('mongodb+srv://Abbas:abikhan123"@travelling.gaeyf.mongodb.net/Abbas?retryWrites=true&w=majority',
{ useFindAndModify: false,  useNewUrlParser: true ,useUnifiedTopology: true,useCreateIndex: true})
.then(()=>{console.log('Connected to db')})
.catch(err=>{console.log('refuse to connect',err)});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/api/user', require('./Routes/User'));
app.use('/api/product', require('./Routes/Product'));
app.use('/api/payment', require('./Routes/Payment'));


app.use('/uploads', express.static('uploads'));


const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});


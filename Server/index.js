const express = require('express');
const mongoose = require('mongoose');
const app = express();
var cookieParser = require('cookie-parser')
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URO || process.env.MONGO_URI,
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

if(process.env.NODE_ENV === 'production'){
   app.use(express.static('Client/build'));

   app.get('*',(req,res)=>{
     res.sendFile(path.resolve(__dirname,'Client','build','index.html'));
   })
}

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});


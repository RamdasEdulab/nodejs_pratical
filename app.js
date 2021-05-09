
const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const  mongoose  = require('./DB/mongodb');
 cors= require('cors')
var cookieParser = require('cookie-parser');



var ProductRoutes = require('./routes/ProductRoutes');
var UserRoutes = require('./routes/UserRoutes');
var OrderRoutes = require('./routes/OrderRoutes');
var UploadRoutes = require('./routes/UploadRoutes');



const app = express()

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/products', ProductRoutes)
app.use('/api/users', UserRoutes)
app.use('/api/orders', OrderRoutes)
app.use('/api/upload', UploadRoutes)

app.listen(5000, () => console.log('Server started at port : 5000'));

module.exports=app;



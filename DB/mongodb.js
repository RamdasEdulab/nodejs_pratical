const mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/Ecommerce'
mongoose.connect(url)
  .then(()=>{
      console.log('mongodb connected');
  }).catch(()=>{
      console.log('erroe occured');
  })

  module.exports=mongoose;

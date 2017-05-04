  var express = require('express');
  var router = express.Router();

  var MongoClient = require('mongodb').MongoClient;
  var DB_CONN_STR = 'mongodb://127.0.0.1:27017/PornHub';  

  var selectData = function(db,startpage , callback ) {  
    //连接到表  
    var collection = db.collection('PhRes');
    var len  = 0;
    //查询数据
    //var whereStr = {"name":'wilson001'};
    //
    collection.count(function(err, result) {
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }
      len = result;
      }); 
    var skipint = 20* (startpage-1);
    
    console.log(skipint);
    //console.log(limitint);
    collection.find().skip(skipint).limit(20).toArray(function(err, result) {
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }
      callback(result,len);
    });
  }



  /* GET users listing. */
  router.get('/:id', function(req, res, next) {
          console.log(req.params.id)
          MongoClient.connect(DB_CONN_STR, function(err, db) {
              console.log("连接成功！");

              selectData(db,req.params.id, function(result,count) {
                 //console.log(result);
                 //console.log(result.length)
                 res.render('hubshow',{'re':result,'len':count,'curpage':req.params.id});
                 db.close();
               });
          });


  });
  router.get('/', function(req, res, next) {
          console.log(req.params.id)
          MongoClient.connect(DB_CONN_STR, function(err, db) {
              console.log("连接成功！");

              selectData(db,1, function(result,count) {
                 //console.log(result);
                 //console.log(result.length)
                 res.render('hubshow',{'re':result,'len':count,'curpage':1});
                 db.close();
               });
          });
  });
  module.exports = router;

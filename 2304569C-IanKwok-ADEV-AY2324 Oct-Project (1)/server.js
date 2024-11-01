var express = require("express"); //using the express framework
var db = require('./db-connections');
var app = express(); // set variable app to be an instance of express framework. From now on, app is the express

app.use(express.json()); // json() is a method inbuilt in express to recognize the incoming Request Object from the web client as a JSON Object.

app.use(express.static("./public"));   //static files are to be servered from the public folder




app.route('/product').get( function (req, res) {
    // the database retrieval code
    //implement SELECT query to retrieve all Products
    // select product.id, product.name as name, product.picture, product.description, category.name as category, product.price from product join category on product.category_id = category.id
    var sql = "select product.id, product.name as name, product.picture, product.description, category.name as category, product.price from product join category on product.category_id = category.id";
    //perform query to database from web server
    db.query(sql, function(error, result){    
        if(error){
            throw error;  
        }else{
            //return result as json
            res.json(result);
        }
    });

});

app.route('/product/:id').get( function (req, res) {

  // the database retrieval code
  //implement SELECT query to retrieve all RESTAURANTS
    var sql = "SELECT * FROM `product` where id = ?";



    // the parameter to replace the ?
    var parameter = [req.params.id]

    db.query(sql,parameter, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });

});

app.route('/product').post( function (req, res) {

  //implement insert query to insert data into the product using placeholder values
  // we do not need the id, it will be auto increment
    var sql = "INSERT INTO `product` (name, description, price, category_id, picture) VALUES (?, ?, ?, ?, ?)";

    //get the values from the req.body
    //the variable sequence should be the same as the insert sequence in the insert sql

    var parameters = [req.body.name, req.body.description, req.body.price, req.body.category_id, req.body.picture];

    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });

});

app.route('/product/:id').put( function (req, res) {

  // update sql statement for one product
    var sql = "UPDATE product SET name = ?, description = ?, price = ?, category_id = ?, picture = ? WHERE id = ?";

    //get the values from the req.body
    //the variable sequence should be the same as the update sequence in the insert sql
    var parameters = [req.body.name, req.body.description, req.body.price, req.body.category_id, req.body.picture, req.params.id];

    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });
});

app.route('/product/:id').delete( function (req, res) {

  // update sql statement for one product 
    var sql = "DELETE FROM `product` WHERE id = ?";

    var parameters = [req.params.id]; // the ID of the product to delete is passed as a URL parameter

    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });

});

app.route('/category').get( function (req, res) {


  // the database retrieval code
  //implement SELECT query to retrieve all categories
    var sql = "SELECT * FROM category";
  //perform query to database from web server
    db.query(sql, function(error, result){
        if(error){
            throw error;
        }else{
          //return result as json
            res.json(result);
        }
    });

});

app.route('/category/:id').get( function (req, res) {

// the database retrieval code
    var sql = "SELECT * FROM `category` where id = ?";

    // the parameter to replace the ?
    var parameter = [req.params.id]

    db.query(sql,parameter, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });

});

app.route('/category').post(function (req, res) {
    // Accessing JSON body sent by client
    const name = req.body.name;
    var sql = "INSERT INTO `category` (name) VALUES (?);"
    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
              //return result as json
            res.json(result);
        }
    });

});

app.route('/category/:id').put( function (req, res) {

// update sql statement for one restaurant 
    var sql = "UPDATE `category` SET name = ?";

    //get the values from the req.body
    //the variable sequence should be the same as the update sequence in the insert sql
    var parameters = [req.body.name];

    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });

});

app.route('/category/:id').delete( function (req, res) {

// update sql statement  
    var sql = "DELETE FROM `category` WHERE id = ?";

    var parameters = [req.params.id]; // the ID of the category to delete is passed as a URL parameter

    db.query(sql, parameters, function(error, result){
        if(error){
            throw error;
        }else{
            //return result as json
            res.json(result);
        }
    });

});

app.listen(8080, "127.0.0.1"); // start the nodejs to be listening for incoming request @ port 8080
console.log("web server running @ http://127.0.0.1:8080"); // output to console 


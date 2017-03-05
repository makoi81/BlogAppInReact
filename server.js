'use strict'
/* 
	Fallback server for supporting browserHistory
	in your React application. 
*/

//instatiate sequelize and sqlite
const Sequelize = require('sequelize');
//const DatabaseURL = 'sqlite://db';
const DatabaseURL = process.env.DATABASE_URL || 'sqlite://db';
console.log(DatabaseURL);

const port = process.env.PORT || 3000;


const sequelize = new Sequelize(DatabaseURL);
	
//instatiate path and express
const express = require('express')
//import path from 'path'
const path = require('path')
const app = express()

//import models from './models';
//const models = require("./models")
const bodyParser = require("body-parser");

app.use('jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));

// DataBase for Post
const Post = sequelize.define('Post', {
    //create title and content as strings,
    title: Sequelize.STRING,
    content: Sequelize.STRING
});
  
  

//use the public folder as the static directory. 
app.use( express.static(path.join(__dirname, 'public')));

app.get("/posts", (req, res) => {
	Post.findAll().then(
		(results) => res.json(results)

	);
});

app.post('/posts', (req, res) => {
	
	let newEntre = {
		title: req.body.title,
		content:req.body.content
	}

	console.log(newEntre);
	console.log('Hi guys this my express app');
	Post.create(newEntre).then((rows) =>{
		console.log(rows);
		res.json( rows);

	});
	
 });
      // setting a route to edit a single post
      //this.props.params.id

 app.post('/edit/:id', function (req, res) {
 // res.send('/edit:id');

  let newEntre = {
		title: req.body.title,
		content:req.body.content
	}


    Post.update(
    	newEntre,
    	{
      		where:{
  				id:req.params.id
  			}
    	}
    ).then(function(result) {



    	res.json(result)

    });
})

 //Delete a post info from the dataBase
app.get('/delete/:id', function(req, res) {

    Post.destroy(
    	{
            where: {
                id: req.params.id
            }
        }).then(function(results) {


        res.json(results);
    });
});


//send any route to index.html where the react app is mounted
app.get('*', (req,res)=>{
	res.sendFile(path.join(__dirname,'public/index.html'))
})

//app.listen(3000,()=>console.log('running on localhost:3000'))

sequelize.sync().then(()=>{
	app.listen(port,()=>console.log('running on localhost:'+port))

});




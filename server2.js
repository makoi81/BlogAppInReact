'use strict'
/* 
	Fallback server for supporting browserHistory
	in your React application. 
*/

//instatiate sequelize and sqlite
const Sequelize = require('sequelize');
const DatabaseURL = 'sqlite://db';
const sequelize = new Sequelize(DatabaseURL);
	

//instatiate path and express
const express = require('express')
const path = require('path')
//import path from 'path'
const app = express()

//import models from './models';
//const models = require("./models")
const bodyParser = require("body-parser");

app.use('jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));

// DataBase
const Post = sequelize.define('Post', {
    //create title and content as strings,
    title: Sequelize.STRING,
    content: Sequelize.TEXT
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


//send any route to index.html where the react app is mounted
app.get('*', (req,res)=>{
	res.sendFile(path.join(__dirname,'public/index.html'))
})

//app.listen(3000,()=>console.log('running on localhost:3000'))

sequelize.sync().then(()=>{
	app.listen(3000,()=>console.log('running on localhost:3000'))

});




const express=require('express');
const app=express();
const cors=require('cors');
const sequelize=require('./Models/item')
const Router=require('./Routes/route')

app.use(cors());
app.use(express.json());

app.use('/', Router);

sequelize.sync()
	.then(res => {
		console.log(res);
		app.listen(4000);
	})
	.catch(err => console.log(err));
console.log('WELCOME TO BACKEND WOLRD OF EXPENSE TRACKER IN NODE JS LET\'S CREATE CRUD API');
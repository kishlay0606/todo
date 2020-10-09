const express = require('express');

const app = express();

const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const auth = require("./oAuth");

const jwt = require('jsonwebtoken');
const userModel = require('./coll');
const keys = require('./keys.json');

router.get('/:id', (req, res) => {
	const id = req.params.id
	userModel.findById(id)
		.select('-password')
		.exec()
		.then(data => {
			res.json(data).status(200);
		})

})
router.post('/logout', (req, res) => {
	res.sendfile('./index.html');
})

router.post('/login', (req, res) => {
	const email = req.body.email2;
	const password = req.body.password2;
	console.log(password)

	
	userModel.findOne({ email: email })
		.exec()
		.then((data) => {
			console.log(data);
			if (data) {
				if (password == data.password) {
					res.sendfile('./task_save.html');
				}
				else {
					res.send("password incorrect").status(403);
				}
			}
			else {
				res.send("user does not exist").status(404);
			}
		})
})

router.post('/create', (req, res) => {

	const email = req.body.email1;
	const password = req.body.password1;
	const name = req.body.name1;
	const phone = req.body.phonenumber;
	userModel.findOne({ email: email })
		.exec()
		.then((data) => {
			if (data) {
				res.send("email already exist").status(401);
			}
			else {
				
				const newUser = new userModel({
					_id: new mongoose.Types.ObjectId(),
					email: req.body.email1,

					password: req.body.password1,
					name: req.body.name1,
					phone: req.body.phonenumber,
					
				})
				console.log(req.body.email1)
				console.log(req.body.password1)
				newUser.save();
				res.sendfile('./thankyou.html');

				  
			}
		})
		.catch((err) => {
			console.log(err);
		})

})

router.delete('/:id', (req, res) => {
	const id = req.params.id
	userModel.findByIdAndDelete(id)
		.exec()
		.then(data => {
			res.json(data).status(200);

		})
		.catch(err => {
			res.json(err).status(500);
		})

})

router.post('/update_password', (req, res) => {
	const email = req.params.email;
	const old_password = req.params.old_password;
	const new_password = req.params.new_password;

	userModel.findOne({ email: email })
		.exec()
		.then(data => {
			if (data) {
				if (bcrypt.compareSync(old_password, data.password)) {
					data.password = bcrypt.hashSync(new_password);
					data.save();
					res.send("password updated").status(200);
				}
				else {
					res.send("password incorrect").status(403);
				}
			}
			else {
				res.send("email not exist").status(401);
			}
		})
		.catch(err => {
			res.json(err).status(500);
		})

})

module.exports = router;
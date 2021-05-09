const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { authMiddleware, checkUser } = require('./middleware/authMiddleware');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/jwt", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(res => {
	  app.listen(3000);
	})
  .catch(err => console.log(err));

app.use('*', checkUser);
app.get('/', authMiddleware, (req, res) => res.render('home'));
app.get('/smoothies', authMiddleware, (req, res) => res.render('smoothies'));
app.use(authRoutes);

const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.static('public'))

app.set('view engine', 'ejs')

mongoose.connect("mongodb://localhost:27017/jwt", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(res => {
	  app.listen(3000);
	})
  .catch(err => console.log(err))

app.get('/', (req, res) => res.render('home'))
app.get('/smoothies', (req, res) => res.render('smoothies'))

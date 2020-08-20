require('dotenv').config()
const vhost = require('./lib/vhost')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())

app.use(function (req, res, next) {
	if (req.body.key != process.env.API_KEY) return res.json({
		error: 'Invalid key.'
	})

	next()
})

app.get('/', (req, res) => {
	res.send(`vhost online.`)
})

var server = app.listen(port, () => {
	console.log(`vhost listening on ${port}.`)
})

require(`./routes/vhost`)(app)
require(`./routes/install`)(app)
require(`./routes/ssl`)(app)
require(`./routes/about`)(app)
require(`./routes/backup`)(app)

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '15MB' }))

app.post('/', (req, res) => {
	fs.writeFile('../../assets/upload/'+ req.body.fotoName, req.body.imgsource, 'base64', (err) => {
		if (err) throw err
	})
	res.status(200)
})
app.listen(8080)
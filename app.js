const express = require('express')
const bodyParser = require('body-parser')
const morgan  = require('morgan')
const app = express()
const sequelize = require('./src/db/sequelize')
const port = 3000

app
.use(morgan('dev'))
.use(bodyParser.json())
// connexion à la BDD
sequelize.initDb()

// Endpoints of the app
app.listen(port,()=>console.log(`L'application tourne sur le port http://localhost:${port}`))

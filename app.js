const express = require('express')
const bodyParser = require('body-parser')
const morgan  = require('morgan')
const app = express()
const sequelize = require('./src/db/sequelize') 
const port = 8002

app
.use(morgan('dev'))
.use(bodyParser.json())
// connexion et initialisation de la BDD
sequelize.initDb()

// Endpoints of the app
//Liste de tous les Pokemons
require('./src/routes/findAllPokemons')(app)
// find one pokemon by id
require('./src/routes/findByPk')(app)
// Ajouter un nouveau pokemon
require('./src/routes/addPokemon')(app)
//modification de pokemon
require('./src/routes/updatePokemon')(app)
// suppression de pokemon
require('./src/routes/deletePokemon')(app)
app.listen(port,()=>console.log(`L'application tourne sur le port http://localhost:${port}`))
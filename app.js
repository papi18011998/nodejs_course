const express = require('express')
var pokemons = require('./api/mock-pokemon.js')
const {success} = require('./helpers/helper.js')
const bodyParser = require('body-parser')
const morgan  = require('morgan')
const { application } = require('express')
const {Sequelize, DataTypes} = require('sequelize')
const PokemonsModel = require('./src/models/pokemons')
const Credentials = require('./helpers/credentials')
const app = express()
const port = 3000

// create sequilze instance
const sequelize = new Sequelize(
    Credentials.dbname,
    Credentials.username,
    Credentials.password,
    {
        host: 'localhost',
        dialect:'mysql'
    }
)
sequelize.authenticate()
.then(()=>console.log('connexion etablie'))
.catch((error)=>console.log('erreur de connexion ',error))

// mise en place de la synchronisation a la BDD

const Pokemon = PokemonsModel(sequelize,DataTypes)
sequelize.sync({alter: true})
    .then(()=>console.log('La base est synchrone'))
app
.use(morgan('dev'))
.use(bodyParser.json())

app.get('/api/pokemons',(req,res)=>{
    const message = 'Liste des pokemons'
    console.log(pokemons);
    res.json(success(message,pokemons))
})

app.get('/api/pokemons/:id',(req,res)=>{
    const id = req.params.id
    const pokemon = pokemons.find(pokemon => pokemon.id === parseInt(id))
    const message ='Un pokemon avec l\'id ' + id + ' a été trouvé.'
    res.json(success(message,pokemon))
})

app.post('/api/pokemons',(req,res)=>{
    const body = req.body
    Pokemon.create({
        name: body.name,
        hp: body.hp,
        cp: body.cp,
        picture: body.picture,
        types: body.types.join(),
        createdAt: new Date()
    }).then((response)=>res.json(response.toJSON()))    
})

app.put('/api/pokemons/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const pokemonUpdated = {...req.body,id:id} 
    pokemons = pokemons.map((pokemon) => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = 'Le pokemon a été modifié.'
    res.json(success(message,pokemonUpdated))
})

application.delete('/api/pokemons/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find((pokemon)=> pokemon.id === id)
    pokemons.filter((pokemon)=>{pokemon.id!==id}) 
    const message = 'Le pokemon a été supprimeé.'
    res.json(success(message,pokemonDeleted))
})
app.listen(port,()=>console.log(`L'application tourne sur le port http://localhost:${port}`))
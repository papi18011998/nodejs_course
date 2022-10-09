const express = require('express')
var pokemons = require('./api/mock-pokemon.js')
const {success} = require('./helpers/helper.js')
const bodyParser = require('body-parser')
const morgan  = require('morgan')
const { application } = require('express')
const app = express()
const port = 3000

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
    const pokemonId = pokemons.length + 1
    const pokemonCreated = {...req.body,...{id:pokemonId, createdAt: new Date()}} 
    pokemons.push(pokemonCreated)
    const message = 'Un pokemon a été créé.'
    res.json(success(message,pokemonCreated))
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
const express = require('express')
const pokemons = require('./api/mock-pokemon.js')
const {success} = require('./helpers/helper.js')

const app = express()
const port = 3000
app.get('/',(req,res)=> res.send('Hello Express'))


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

app.listen(port,()=>console.log(`L'application tourne sur le port http://localhost:${port}`))
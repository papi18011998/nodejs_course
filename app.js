const express = require('express')
const pokemons = require('./api/mock-pokemon.js')

const app = express()
const port = 3000
app.get('/',(req,res)=> res.send('Hello Express'))

app.get('/api/pokemons/:id',(req,res)=>{
    const id = req.params.id
    const pokemon = pokemons.find(pokemon => pokemon.id === parseInt(id))
    res.json(pokemon)
})
app.listen(port,()=>console.log(`L'application tourne sur le port http://localhost:${port}`))
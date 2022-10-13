const {Pokemon} = require('../db/sequelize')
const credentials = require('../../helpers/credentials')

module.exports = (app)=>{
    app.get(credentials.apiURL,(req,res)=>{
        Pokemon.findAll()
               .then((pokemons)=>{
                const message = 'Liste des pokemons'
                res.json({message:message, data: pokemons})
               })
    })
}
const {Pokemon} = require('../db/sequelize')
const credentials = require('../../helpers/credentials')

module.exports = (app)=>{
    app.post(credentials.apiURL,(req,res)=>{
        Pokemon.create(req.body)
               .then((pokemonCreated)=>{
                const message = `Le pokemon ${pokemonCreated.name} a  bien été crée !!!`
                res.json({message:message,data:pokemonCreated})
               }) 
    })
}
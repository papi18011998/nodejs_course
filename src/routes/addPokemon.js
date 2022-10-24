const {Pokemon} = require('../db/sequelize')
const credentials = require('../../helpers/credentials')
const {ValidationError} = require("sequelize");

module.exports = (app)=>{
    app.post(credentials.apiURL,(req,res)=>{
        Pokemon.create(req.body)
               .then((pokemonCreated)=>{
                const message = `Le pokemon ${pokemonCreated.name} a  bien été crée !!!`
                res.json({message:message,data:pokemonCreated})
               })
            .catch(error=>{
                if(error instanceof  ValidationError){
                    return res.status(400).json({message:error.message, data: error})
                }
                const message = "Erreur lors de l'ajout"
                res.status(500).json({message:message, data: error})
            })
    })
}

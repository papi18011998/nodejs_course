const {Pokemon} = require('../db/sequelize')
const credentials = require('../../helpers/credentials')
const {ValidationError, UniqueConstraintError} = require("sequelize");

module.exports = (app)=>{
    app.put(`${credentials.apiURL}:id`,(req,res)=>{
        const id = parseInt(req.params.id)
        Pokemon.update(req.body,{where:{id:id}})
               .then(_=>{
                Pokemon.findByPk(id)
                       .then((pokemon)=>{
                        const message = 'Pokemon modifié !!!'
                        res.json({message:message,data:pokemon})
                       }) 
               })
               .catch(error=>{
                   if(error instanceof  UniqueConstraintError){
                       return res.status(400).json({message:error.message})
                   }
                   if(error instanceof ValidationError){
                       return res.status(400).json({message:error.message,data:error})
                   }
                   const message = "Erreur lors de la modification"
                   res.status(500).json({message:message, data: error})
               })
    })
}

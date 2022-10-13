const {Pokemon} = require('../db/sequelize')
const credentials = require('../../helpers/credentials')

module.exports = (app)=>{
    app.delete(`${credentials.apiURL}:id`,(req,res)=>{
        const id = parseInt(req.params.id)

        Pokemon.findByPk(id)
        .then((pokemon)=>{
         const pokemonDeleted = pokemon
                 Pokemon.destroy({where:{id:id}})
               .then(_=>{
                    const message = 'Pokemon supprimé !!!'
                    res.json({message:message,data:pokemonDeleted})
               }) 
        }) 

    })
}
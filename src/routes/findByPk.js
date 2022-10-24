const {Pokemon} = require('../db/sequelize')
const credentials = require('../../helpers/credentials')

module.exports = (app)=>{
    app.get(`${credentials.apiURL}:id`,(req,res)=>{
        Pokemon.findByPk(parseInt(req.params.id))
               .then((pokemon)=>{
                    const message = 'Resultat de la recherche'
                    if(pokemon == null)
                        pokemon = 'Aucun pokémon trouvé !!!'
                    res.json({message:message,data:pokemon})
               }) 
    })
}
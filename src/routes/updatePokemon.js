const {Pokemon} = require('../db/sequelize')
const credentials = require('../../helpers/credentials')

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
    })
}
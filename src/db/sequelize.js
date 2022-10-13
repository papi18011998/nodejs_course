const {Sequelize,DataTypes} = require('sequelize');
const PokemonModel = require('../models/pokemons');
const pokemons = require('./mock-pokemon');
const credentials = require('../../helpers/credentials')

// connexion à la base de données
const sequelize = new Sequelize(
    credentials.dbname,
    credentials.username,
    credentials.password,
    {
        host: credentials.host,
        dialect: credentials.dialect
    }
)

sequelize.authenticate()
    .then(()=>console.log('Connexion à la base de données établie'))
    .catch((error)=>console.log('Erreur de de connexion '+error))

// creation du Model en base de donnees
const Pokemon = PokemonModel(sequelize,DataTypes);


const initDb =() =>{
    sequelize.sync({alter:true})
        .then(()=>{
            // pokemons.map((pokemon)=>{
            //     Pokemon.create({
            //         name: pokemon.name,
            //         hp: pokemon.hp,
            //         cp: pokemon.cp,
            //         picture: pokemon.picture,
            //         types: pokemon.types
            //     }).then(resp=>console.log(resp.toJSON()))
            // })
            console.log('Connexion etablie !!!')
        })
}

module.exports = { initDb,Pokemon}

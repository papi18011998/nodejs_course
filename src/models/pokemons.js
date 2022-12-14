const validTypes = ['Plante','Poison','Feu','Insecte','Vol','Normal','Electrik','Eau','Fée']
module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('pokemon',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique:{
                msg:"Ce pokemon existe déjà !!!"
            },
            validate: {
                notEmpty: {msg:"Le nom du pokemon ne peut pas être vide"},
                notNull: {msg:"Cette propritete est obligatoire"}
            }
        },
        hp:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt: {msg:"Format incorrect: Nombre requis!!!"},
                notNull: {msg:"Cette propritete est obligatoire"},
                max:{
                    args:[999],
                    msg:"Les points de vies ne peuvent pas depasser 999"
                },
                min:{
                    args:[0],
                    msg:"Les points de vies ne peuvent pas être inferieur à 0"
                }
            }
        },
        cp:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                isInt: {msg:"Format incorrect: Nombre requis!!!"},
                notNull: {msg:"Cette propritete est obligatoire"},
                max:{
                    args:[99],
                    msg:"Les dégâts infliges ne peuvent pas depasser 99"
                },
                min:{
                    args:[0],
                    msg:"Les dégâts infliges ne peuvent pas être inferieur à 0"
                }
            }
        },
        picture:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isUrl: {msg:"Format incorrect: url valide requis!!!"},
                notNull: {msg:"Cette propritete est obligatoire"},
            }
        },
        types:{
            type: DataTypes.STRING,
            allowNull: false,
            get(){
                return this.getDataValue('types').split(',')
            },
            set(types){
                this.setDataValue('types',types.join())
            },
            validate:{
                isTypesValid(value){
                    if(!value){
                        throw new Error("Un pokemon doit avoir au moins un type")
                    }
                    if(value.split(',').length > 3){
                        throw new Error("Un pokemon ne peut comporter plus de trois types")
                    }
                    value.split(',').forEach((type)=>{
                        if(!validTypes.includes(type)){
                            throw new Error(`Un pokemon doit appartenir à la liste suivante: ${validTypes}`)
                        }
                    })
                }
            }

        }
    },{
        timestamps:true,// on souhaite modifie le comportement par defaut
        createdAt: 'createdAt',
        updatedAt: true
    }
    )
}

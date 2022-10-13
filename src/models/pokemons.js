module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('pokemon',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        hp:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cp:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        picture:{
            type: DataTypes.STRING,
            allowNull: false
        },
        types:{
            type: DataTypes.STRING,
            allowNull: false,
            get(){
                return this.getDataValue('types').split(',')
            },
            set(types){
                this.setDataValue('types',types.join())
            }

        }
    },{
        timestamps:true,// on souhaite modifie le comportement par defaut
        createdAt: 'createdAt',
        updatedAt: true
    }
    )
}
module.exports = (sequelize,DataTypes) => {

    const alias = 'Product'

    const structure =
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        discount: {
            type: DataTypes.INTEGER
        },
        category: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.STRING
        }
    }

    const config=
    {
        
        timestamps: false
    }
    
    return sequelize.define(alias, structure, config)
}

module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
      id_user : {
        allowNull: false,
        type: DataTypes.STRING
      },
      latitude: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      longitude: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING
      },
    });
  
    Photo.associate = (models) => {
      Photo.belongsTo(models.User, {foreignKey: 'id_user', as: 'user'})
    }

    return Photo;
}
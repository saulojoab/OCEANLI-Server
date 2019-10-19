module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      points: DataTypes.INTEGER,
      level: DataTypes.INTEGER,
      email: {
          type: DataTypes.STRING,
          unique: true
        },
      password: DataTypes.STRING,
    });
  
    return User;
}
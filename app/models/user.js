module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      points: DataTypes.INTEGER,
      level: DataTypes.INTEGER,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    });
  
    return User;
}
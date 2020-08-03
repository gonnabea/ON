module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return User;
}
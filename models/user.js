module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User",{
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return User;
}
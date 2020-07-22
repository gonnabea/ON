module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define("Chat",{
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Chat;
}
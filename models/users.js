"use strict";
const table = "users";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      allowNull: false,
      defaultValue: "Pending",
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    }
  },{timestamps:false});

  User.associate = (models) => {

  };

  return User;
};

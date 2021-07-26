'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    
    static associate(models) {      
      User.hasMany(models.Post, { as: 'posts', foreignKey: 'userId' });
      User.belongsToMany(models.Role, { as: 'roles', through: 'user_role', foreignKey: 'user_id', });
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        //Validaciones
        validate: {
          isAlpha: {
            msg: 'El nombre solo puede contener letras',
          },
          len: {
            args: [3, 20],
            msg: 'El nombre debe tener entre 4 y 20 caracteres',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            arg: [6, 50],
            msg: 'La contraseña debe tener entre 6 y 50 caracteres',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'El email tiene que ser un correo válido',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  //Comprueba que el usuario es administrador
  User.isAdmin = function (roles) {
    let tmpArray = [];  //vector temporal

    roles.forEach(role => tmpArray.push(role.role));
    return tmpArray.includes('admin');
  };

  return User;
};
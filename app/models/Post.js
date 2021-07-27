'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Post extends Model {

    static associate(models) {
      // En belongsTo la fk la tiene el modelo origen (Post)
      Post.belongsTo(models.User, { as: 'author', foreignKey: 'userId' });
    }
  }

  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
  }, 
  {
    sequelize,
    modelName: 'Post',
  });
  
  return Post;
};
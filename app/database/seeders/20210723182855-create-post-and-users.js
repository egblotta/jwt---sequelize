'use strict';

const { User } = require('../../models/index');
const bcrypt = require('bcrypt');
const authConfig = require('../../../config/auth');

module.exports = {

  up: async (queryInterface, Sequelize) => {
    return Promise.all([

      User.create({
        name: 'Emiliano',
        email: 'emiliano@mail.com',
        password: bcrypt.hashSync('123456', Number.parseInt(authConfig.rounds)),
        posts:[
          {
            title: 'Spiderman',
            body: 'Marvel'
          },
          {
            title: 'Avengers',
            body: 'Marvel'
          },
        ]
      },{
        include: 'posts'
      }),

      User.create({
        name: 'Jose',
        email: 'jose@mail.com',
        password: bcrypt.hashSync('123456', Number.parseInt(authConfig.rounds)),
        posts:[
          {
            title: 'Batman',
            body: 'DC'
          },
          {
            title: 'Superman',
            body: 'DC'
          },
        ]
      },{
        include: 'posts'
      })
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('posts', null, {}),
      queryInterface.bulkDelete('users', null, {})
    ]);
  }
};

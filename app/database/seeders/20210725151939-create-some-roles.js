'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return Promise.all([

      //Se insertan datos seeds en la tabla roles y user-role
      queryInterface.bulkInsert(
        'roles',
        [
          { role: 'admin', createdAt: new Date(), updatedAt: new Date() }, //role id 1
          { role: 'user', createdAt: new Date(), updatedAt: new Date() }   //role id 2
        ], 
        {}
      ),

      queryInterface.bulkInsert(
        'user_role',
        [
          {
            user_id: 1,      
            role_id: 1,
            createdAt: new Date(), 
            updatedAt: new Date()
          },
          { 
            user_id: 1,
            role_id: 2,
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
          { 
            user_id: 2,
            role_id: 2,
            createdAt: new Date(), 
            updatedAt: new Date() 
          },
        ],
        {}
        ),
      ]);
    },

  down: async (queryInterface, Sequelize) => {    

    return Promise.all([
      queryInterface.bulkDelete('roles', null, {}),
      queryInterface.bulkDelete('user-role', null, {}),
    ]);    
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Leonardo',
          lastname: 'Dicaprio',
          email: 'leo@test.com',
          password: 'teste',
          image: null,
          isActive: true,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          name: 'Marilia',
          lastname: 'Mendonça',
          email: 'mari@test.com',
          password: 'teste',
          image: null,
          isActive: false,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          name: 'Lorena',
          lastname: 'Reis',
          email: 'lorena@test.com',
          password: 'teste',
          image: null,
          isActive: true,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ],
      {},
    ),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
};

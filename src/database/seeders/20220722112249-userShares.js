'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'userShares',
      [
        {
          userId: 1,
          walletId: 1,
          shareName: 'TEST1',
          amount: 22,
          buyedBy: 12.5,
          totalValue: 275.0,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          userId: 1,
          walletId: 1,
          shareName: 'TEST2',
          amount: 77,
          buyedBy: 23.6,
          totalValue: 1817.2,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          userId: 1,
          walletId: 1,
          shareName: 'TEST3',
          amount: 10,
          buyedBy: 173.21,
          totalValue: 1732.1,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          userId: 3,
          walletId: 3,
          shareName: 'TEST1',
          amount: 50,
          buyedBy: 7.5,
          totalValue: 375.0,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          userId: 3,
          walletId: 3,
          shareName: 'TEST3',
          amount: 100,
          buyedBy: 112.02,
          totalValue: 11202.0,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ],
      {},
    ),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('userShares', null, {}),
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'shareTrades',
      [
        {
          walletId: 1,
          shareName: 'TEST1',
          buyedBy: 12.5,
          selledBy: null,
          amount: 22,
          totalValue: 275.0,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          walletId: 1,
          shareName: 'TEST2',
          buyedBy: 23.6,
          selledBy: null,
          amount: 77,
          totalValue: 1817.2,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          walletId: 1,
          shareName: 'TEST3',
          buyedBy: 173.21,
          selledBy: null,
          amount: 10,
          totalValue: 1732.1,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          walletId: 3,
          shareName: 'TEST1',
          buyedBy: 7.5,
          selledBy: null,
          amount: 150,
          totalValue: 1125.0,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          walletId: 3,
          shareName: 'TEST3',
          buyedBy: 112.02,
          selledBy: null,
          amount: 100,
          totalValue: 11202.0,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          walletId: 3,
          shareName: 'TEST1',
          buyedBy: 7.5,
          selledBy: 12.5,
          amount: 50,
          totalValue: 625.0,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        {
          walletId: 3,
          shareName: 'TEST1',
          buyedBy: 7.5,
          selledBy: 15.17,
          amount: 50,
          totalValue: 758.5,
          createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
          updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      ],
      {},
    ),

  down: async (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('shareTrades', null, {}),
};

'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('shareTrades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      walletId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        /* onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'Wallet',
          key: 'id',
        }, */
      },
      shareName: {
        type: Sequelize.STRING,
        allowNull: false,
        /* references: {
          model: 'UserShare',
          key: 'shareName',
        }, */
      },
      buyedBy: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      selledBy: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      totalValue: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('shareTrades');
  },
};

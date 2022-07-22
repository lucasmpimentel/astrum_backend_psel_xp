'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        /* onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
        }, */
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
      destination: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      value: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable('transactions');
  },
};

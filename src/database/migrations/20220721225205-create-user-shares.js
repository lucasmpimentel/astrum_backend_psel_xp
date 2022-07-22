'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userShares', {
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
          model: 'user',
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
      shareName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      buyedBy: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      totalValue: {
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
    await queryInterface.dropTable('userShares');
  },
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) =>
    await queryInterface.createTable('wallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        /* onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'User',
          key: 'id',
        }, */
      },
      value: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),
  down: async (queryInterface, Sequelize) =>
    await queryInterface.dropTable('wallets'),
};

const Transaction = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      userId: DataTypes.INTEGER,
      walletId: DataTypes.INTEGER,
      destination: DataTypes.INTEGER,
      value: DataTypes.DECIMAL,
    },
    {
      tableName: 'Transactions',
      freezeTableName: true,
    },
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    Transaction.belongsTo(models.Wallet, {
      foreignKey: 'walletId',
      as: 'transactions',
    });
    Transaction.belongsTo(models.Wallet, {
      foreignKey: 'destination',
      as: 'transactionsIncome',
    });
  };

  return Transaction;
};

module.exports = Transaction;

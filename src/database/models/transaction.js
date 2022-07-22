const Transaction = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'Transaction',
    {
      id: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      walletId: DataTypes.INTEGER,
      destination: DataTypes.INTEGER,
      value: DataTypes.DECIMAL,
    },
    {
      tableName: 'Transactions',
    },
  );

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    Transaction.belongsTo(models.Wallet, {
      foreignKey: 'walletId',
      as: 'transactions',
    });
    Transaction.hasMany(models.Wallet, {
      foreignKey: 'destination',
      as: 'transactionsIncome',
    });
  };

  return Transaction;
};

module.exports = Transaction;

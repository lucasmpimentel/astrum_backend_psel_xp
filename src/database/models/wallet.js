const Wallet = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    'Wallet',
    {
      id: DataTypes.INTEGER,
      value: DataTypes.DECIMAL,
      userId: DataTypes.INTEGER,
    },
    {
      tableName: 'Wallets',
    },
  );
  
  /* Wallet.associate = (models) => {
    Wallet.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    Wallet.hasMany(models.UserShare, {
      foreignKey: 'walletId',
      as: 'userShares',
    });
    Wallet.hasMany(models.ShareTrade, {
      foreignKey: 'walletId',
      as: 'shareTrades',
    });
    Wallet.hasMany(models.Transaction, {
      foreignKey: 'walletId',
      as: 'transactions',
    });
    Wallet.belongsTo(models.Transaction, {
      foreignKey: 'destination',
      as: 'transactionsIncome',
    });
  }; */

  return Wallet;
};

module.exports = Wallet;

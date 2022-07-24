const Wallet = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    'Wallet',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      value: DataTypes.DECIMAL,
      userId: DataTypes.INTEGER,
    },
    {
      tableName: 'wallets',
      freezeTableName: true,
    },
  );

  Wallet.associate = (models) => {
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
    Wallet.hasMany(models.Transaction, {
      foreignKey: 'destination',
      as: 'transactionsIncome',
    });
  };

  return Wallet;
};

module.exports = Wallet;

const ShareTrade = (sequelize, DataTypes) => {
  const ShareTrade = sequelize.define(
    'ShareTrade',
    {
      id: DataTypes.INTEGER,
      walletId: DataTypes.INTEGER,
      shareName: DataTypes.STRING,
      buyedBy: DataTypes.DECIMAL,
      selledBy: DataTypes.DECIMAL,
      amount: DataTypes.INTEGER,
      totalValue: DataTypes.DECIMAL,
    },
    {
      tableName: 'ShareTrades',
    },
  );

  ShareTrade.associate = (models) => {
    ShareTrade.belongsTo(models.Wallet, {
      foreignKey: 'walletId',
      as: 'wallets',
    });
  };

  return ShareTrade;
};

module.exports = ShareTrade;

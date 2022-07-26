const ShareTrade = (sequelize, DataTypes) => {
  const ShareTrade = sequelize.define(
    'ShareTrade',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      walletId: DataTypes.INTEGER,
      shareName: DataTypes.STRING,
      buyedBy: DataTypes.DECIMAL,
      selledBy: DataTypes.DECIMAL,
      amount: DataTypes.INTEGER,
      totalValue: DataTypes.DECIMAL,
    },
    {
      tableName: 'shareTrades',
      freezeTableName: true,
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

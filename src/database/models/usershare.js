const UserShare = (sequelize, DataTypes) => {
  const UserShare = sequelize.define(
    'UserShare',
    {
      id: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      walletId: DataTypes.INTEGER,
      shareName: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      buyedBy: DataTypes.DECIMAL,
      totalValue: DataTypes.DECIMAL,
    },
    {
      timestamps: false,
      tableName: 'UserShares',
    },
  );
  
  /* UserShare.associate = (models) => {
    UserShare.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
  };

  UserShare.associate = (models) => {
    UserShare.belongsTo(models.Wallet, {
      foreignKey: 'walletId',
      as: 'wallets',
    });
  }; */
  
  return UserShare;
};

module.exports = UserShare;

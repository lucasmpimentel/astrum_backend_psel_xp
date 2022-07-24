const UserShare = (sequelize, DataTypes) => {
  const UserShare = sequelize.define(
    'UserShare',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      walletId: DataTypes.INTEGER,
      shareName: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      buyedBy: DataTypes.DECIMAL,
      totalValue: DataTypes.DECIMAL,
    },
    {
      timestamps: false,
      tableName: 'userShares',
      freezeTableName: true,
    },
  );

  UserShare.associate = (models) => {
    UserShare.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    UserShare.belongsTo(models.Wallet, {
      foreignKey: 'walletId',
      as: 'wallets',
    });
  };

  return UserShare;
};

module.exports = UserShare;

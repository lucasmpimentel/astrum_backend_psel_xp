const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      tableName: 'users',
      freezeTableName: true,
    },
  );

  User.associate = (models) => {
    User.hasOne(models.Wallet, { foreignKey: 'userId', as: 'wallets' });
    User.hasMany(models.UserShare, { foreignKey: 'userId', as: 'userShares' });
    User.hasMany(models.Transaction, {
      foreignKey: 'userId',
      as: 'transactions',
    });
  };

  return User;
};

module.exports = User;

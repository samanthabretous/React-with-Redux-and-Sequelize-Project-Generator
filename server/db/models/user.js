module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 100],
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 100],
      },
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return User;
};

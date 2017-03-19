const bcrypt = require('bcrypt-nodejs');

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
        len: [1, 100],
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 100],
      },
    },
  });
  // change the password user has enter into an encrypted password before entering into database
  User.hook('beforeCreate', (user, fn) => {
    const newSalt = bcrypt.genSalt(12, (err, salt) => salt);
    user.password = bcrypt.hashSync(user.password, newSalt);
    return fn;
  });
  return User;
};

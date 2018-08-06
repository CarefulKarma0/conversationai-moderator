'use strict';

const {User, USER_GROUP_GENERAL, USER_GROUP_ADMIN, USER_GROUP_SERVICE, USER_GROUP_YOUTUBE} = require('../models/user');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return (async () => {
      await queryInterface.changeColumn('users', 'group', {
        type: Sequelize.ENUM(USER_GROUP_GENERAL, USER_GROUP_ADMIN, USER_GROUP_SERVICE, USER_GROUP_YOUTUBE),
        allowNull: false,
      });
      await queryInterface.addIndex('users', {
        fields: ['email', 'group'],
        unique: true,
      });
      await queryInterface.changeColumn('users', 'email', {
        type: Sequelize.CHAR(255),
        allowNull: true,
        unique: false,
      });
      await queryInterface.sequelize.query( // TODO: Old versions of sequelize can't remove constraints.  Remove this if/when we upgrade
        'ALTER TABLE users DROP INDEX email;'
      );
    })();
  },

  down: function (queryInterface, Sequelize) {
    return (async () => {
      await queryInterface.removeIndex('users', ['email', 'group']);
      await User.destroy({where: {group: 'youtube'}});
      await queryInterface.changeColumn('users', 'group', {
        type: Sequelize.ENUM(USER_GROUP_GENERAL, USER_GROUP_ADMIN, USER_GROUP_SERVICE),
        allowNull: false
      });
      await queryInterface.changeColumn('users', 'email', {
        type: Sequelize.CHAR(255),
        allowNull: true,
        unique: true,
      });
    })();
  }
};

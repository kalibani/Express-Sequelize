'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.addConstraint('Teachers',['SubjectId'], {
      type: 'FOREIGN KEY',
      name: 'custom_fkey_constraint_name',
      references: {//Require field
        table: 'Subjects',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'

    });
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};

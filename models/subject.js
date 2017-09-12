'use strict';
module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

          // Subject.hasMany(models.Teacher, {foreignKey: 'SubjectId'});
          // Subject.hasMany(models.Student, {foreignKey: 'SubjectId'});
      }
    }
  });

  Subject.associate = function (models) {
    Subject.hasMany(models.Teacher);
  };
  return Subject;
};

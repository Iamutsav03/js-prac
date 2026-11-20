const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Student = db.define(
  'Student',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name is required' }
      }
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Email must be a valid email address' },
        notEmpty: { msg: 'Email is required' }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: { msg: 'Age must be an integer' },
        min: { args: [1], msg: 'Age must be at least 1' }
      }
    },
    course: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  },
  {
    tableName: 'students',
    timestamps: false,
    underscored: true
  }
);

module.exports = Student;

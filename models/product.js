const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Product = sequelize.define('Product', {
  ProductId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'ProductId'
  },
  Name: {
    type: DataTypes.STRING, // nvarchar(max)
    allowNull: false,
    field: 'Name'
  },
  Price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    field: 'Price'
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'Description'
  },
  CategoryName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'CategoryName'
  },
  ImageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ImageUrl'
  },
  ImageLocalPath: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'ImageLocalPath'
  }
}, {
  tableName: 'Productos',
  timestamps: false
});

module.exports = Product;

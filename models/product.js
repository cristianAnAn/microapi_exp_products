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
    type: DataTypes.STRING,
    allowNull: false,
    field: 'Name'
    // No se usa unique aquí porque será compuesto
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
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'userId'
  }
}, {
  tableName: 'Productos',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'Name'] // 🔐 Índice compuesto opcional
    }
  ]
});

module.exports = Product;

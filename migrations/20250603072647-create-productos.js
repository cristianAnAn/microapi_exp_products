'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Productos', {
      ProductId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      Name: { type: Sequelize.STRING, allowNull: false },
      Price: { type: Sequelize.FLOAT, allowNull: false },
      Description: { type: Sequelize.STRING },
      CategoryName: { type: Sequelize.STRING },
      ImageUrl: { type: Sequelize.STRING },
      ImageLocalPath: { type: Sequelize.STRING }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Productos');
  }
};

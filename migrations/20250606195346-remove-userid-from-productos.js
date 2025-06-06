'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Primero elimina el índice compuesto si existe
    await queryInterface.removeIndex('Productos', 'user_product_unique').catch(() => {});

    // Luego elimina la columna userId
    await queryInterface.removeColumn('Productos', 'userId');
  },

  down: async (queryInterface, Sequelize) => {
    // Agrega nuevamente la columna
    await queryInterface.addColumn('Productos', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false
    });

    // Restaura el índice compuesto
    await queryInterface.addIndex('Productos', ['userId', 'Name'], {
      unique: true,
      name: 'user_product_unique'
    });
  }
};

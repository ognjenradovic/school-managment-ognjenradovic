'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Subjects', [{
      name:'English',
      book:'Klett English',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name:'Biology',
      book:'Klett Biology',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Maths',
      book:'Krug Maths 1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'History',
      book:'History Zavod',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Chemistry 2',
      book:'Klett Chemistry 2',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};

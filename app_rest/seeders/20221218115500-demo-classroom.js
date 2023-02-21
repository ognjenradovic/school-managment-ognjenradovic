'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Classrooms', [
    {
      number:22,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number:11,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number:31,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number:28,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number:14,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
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

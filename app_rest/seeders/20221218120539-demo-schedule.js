'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Schedules', [{
      name:'Morning schedule',
      classId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Morning schedule',
      classId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Morning schedule',
      classId:3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Morning schedule',
      classId:4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Evening schedule',
      classId:5,
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

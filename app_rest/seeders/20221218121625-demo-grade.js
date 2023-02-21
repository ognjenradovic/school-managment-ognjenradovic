'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Grades', [{
      grade: 4,
      studentId: 1,
      subjectId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      grade: 5,
      studentId: 1,
      subjectId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      grade: 3,
      studentId: 5,
      subjectId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      grade: 4,
      studentId: 3,
      subjectId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      grade: 1,
      studentId: 4,
      subjectId: 2,
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

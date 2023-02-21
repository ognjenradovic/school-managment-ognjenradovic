'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Lessons', [{
      number:5,
      lessonDate: new Date(),
      time:14,
      scheduleId:1,
      subjectId:1,
      classroomId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number:1,
      lessonDate: new Date(),
      time:11,
      scheduleId:2,
      subjectId:3,
      classroomId:3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number:2,
      lessonDate: new Date(),
      time:18,
      scheduleId:1,
      subjectId:1,
      classroomId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number:1,
      lessonDate: new Date(),
      time:14,
      scheduleId:4,
      subjectId:4,
      classroomId:6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number:7,
      lessonDate: new Date(),
      time:15,
      scheduleId:5,
      subjectId:1,
      classroomId:2,
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

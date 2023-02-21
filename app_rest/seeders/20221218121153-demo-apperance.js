'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Apperances', [{
      notes:'Student was behaving well',
      lessonId:1,
      studentId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      notes:'Student wasnt behaving well',
      lessonId:1,
      studentId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ,{
    notes:'Student was behaving well',
    lessonId:2,
    studentId:1,
    createdAt: new Date(),
    updatedAt: new Date()
  }
,{
  notes:'Student got suspended',
  lessonId:3,
  studentId:3,
  createdAt: new Date(),
  updatedAt: new Date()
},{
  notes:'Student was behaving well',
  lessonId:4,
  studentId:1,
  createdAt: new Date(),
  updatedAt: new Date()
},{
  notes:'Student was behaving well',
  lessonId:5,
  studentId:2,
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

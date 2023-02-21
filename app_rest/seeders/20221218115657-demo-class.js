'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Classes', [{
      number:201,
      classProfessorId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number:101,
      classProfessorId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      number:202,
      classProfessorId:3,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,
    {
      number:203,
      classProfessorId:4,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,{
      number:301,
      classProfessorId:5,
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

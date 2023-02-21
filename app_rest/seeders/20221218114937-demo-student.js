'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Students', [{
      name: 'Petar',
      email: 'petar@example.com',
      password: '12345',
      classId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Luka',
      email: 'luka@example.com',
      password: '12afw34',
      classId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'aleksa',
      email: 'aleksa@exampleee.com',
      password: '11111111',
      classId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'radovan',
      email: 'radovan@exampleee.com',
      password: '222222',
      classId:3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'dusan',
      email: 'dusan@example.com',
      password: '12345',
      classId:4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
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

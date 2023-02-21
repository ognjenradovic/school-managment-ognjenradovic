'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Notifications', [{
      content:'This is an annoucnment',
      announcmentID:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content:'This is an annoucnment 1',
      announcmentID:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content:'This is an annoucnment 2',
      announcmentID:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content:'This is an annoucnment 3',
      announcmentID:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content:'This is an annoucnment 4',
      announcmentID:4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content:'This is an annoucnment 5',
      announcmentID:5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content:'This is an annoucnment 6',
      announcmentID:2,
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

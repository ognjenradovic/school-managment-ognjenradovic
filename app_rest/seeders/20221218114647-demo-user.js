'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      name: 'aleksa',
      email: 'aleksa@skola.com',
      admin: 1,
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'milos',
      email: 'milos@skola.com',
      admin: 0,
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'petar',
      email: 'petar@raf.rs',
      admin: 1,
      password: '222512515',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,
    {
      name: 'milica',
      email: 'milica@raf.rs',
      admin: 1,
      password: '14241241',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,
    {
      name: 'marija',
      email: 'marija@raf.rs',
      admin: 0,
      password: '1112444',
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

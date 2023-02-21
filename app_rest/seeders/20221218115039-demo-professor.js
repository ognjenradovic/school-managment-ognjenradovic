'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Professors', [{
      name: 'Tanja',
      email: 'tanja@example.com',
      password: '123456',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,
    {
      name: 'zarko',
      email: 'zarko@examplee.com',
      password: '222222',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,
    {
      name: 'cedomir',
      email: 'cedomir@example.com',
      password: '123457',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'jovana',
      email: 'jovana@example.com',
      password: '124144',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ,
    {
      name: 'miloje',
      email: 'miloje@example.com',
      password: '12345',
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

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Announcments', [{
      name:'School announcments',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name:'Maintanence announcments',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  {
    name:'Holiday announcments',
    createdAt: new Date(),
    updatedAt: new Date()
  },
{
  name:'Emergency announcments',
  createdAt: new Date(),
  updatedAt: new Date()
}
,{
  name:'First grade announcments',
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

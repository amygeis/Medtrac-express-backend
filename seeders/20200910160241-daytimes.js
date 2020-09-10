'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Times', [{
      time: 'Midnight',
      },
      {
        time: '1 am',
      },
      {
        time: '2 am',
      },
      {
        time: '3 am',
      },
      {
        time: '4 am',
      },
      {
        time: '5 am',
      },
      {
        time: '6 am',
      },
      {
        time: '7 am',
      },
      {
        time: '8 am',
      },
      {
        time: '9 am',
      },
      {
        time: '10 am',
      },
      {
        time: '11 am',
      },
      {
        time: 'Noon',
      },
      {
        time: '1 pm',
      },
      {
        time: '2 pm',
      },
      {
        time: '3 pm',
      },
      {
        time: '4 pm',
      },
      {
        time: '5 pm',
      },
      {
        time: '6 pm',
      },
      {
        time: '7 pm',
      },
      {
        time: '8 pm',
      },
      {
        time: '9 pm',
      },
      {
        time: '10 pm',
      },
      {
        time: '11 pm',
      },
    ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Times', null, {});
    
  }
};

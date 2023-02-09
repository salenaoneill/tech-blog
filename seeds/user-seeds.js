const { User } = require('../models');

const userData = [
    {
        username: 'tech_guy',
        email: 'techguy@tech200',
        password: '1234'
    },
    {
        username: 'tech_gal',
        email: 'techgal@tech200',
        password: '4321'
    },
    {
        username: 'i_am_not_a_robot',
        email: 'robot@gmail.com',
        password: 'password'
    },
    {
        username: 'megan_fox',
        email: 'therealmeganfox@gmail.com',
        password: 'password1234'
    },
    {
        username: 'yo_momma',
        email: 'luvmychildren@gmail.com',
        password: '1234'
    },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
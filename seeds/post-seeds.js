const { Post } = require('../models'); 

const postData = [
    {
        title: 'Languages',
        post_text: 'There are around 700 seperate coding languages!!!',
        user_id: 1
    }, 
    {
        title: 'First computer Programmer',
        post_text: 'The worlds first computer programmer was a female mathemetican, Ada Lovelace',
        user_id: 2
    },
    {
        title: 'Tech company layoffs',
        post_text: 'Paypal, microsoft, and more are cutting jobs! scared for my future as a developer.',
        user_id: 3
    },
    {
        title: 'Bootstrap',
        post_text: 'Just found out about bootstrap. I reccomend it!',
        user_id: 4
    },
    {
        title: 'I am having a meltdown',
        post_text: 'please someone i need help with this debugging issue or I am going off the rails.',
        user_id: 5
    }
];

const seedPosts = () => Post.bulkCreate(postData);
module.exports = seedPosts;
const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'thanks for sharing this!!!',
        post_id: 3,
        user_id: 5
    },
    {
        comment_text: 'not true >:( poser developer!',
        post_id: 1,
        user_id: 4
    },
    {
        comment_text: 'Could you elaborate on this please?',
        post_id: 2,
        user_id: 3
    },
    {
        comment_text: 'this is so true you little braniac',
        post_id: 4,
        user_id: 1
    },
    {
        comment_text: 'please respond to my texts, cass the kids miss you',
        post_id: 5,
        user_id: 2
    },
];

const seedComments = () => Comment.bulkCreate(commentData);
module.exports = seedComments;
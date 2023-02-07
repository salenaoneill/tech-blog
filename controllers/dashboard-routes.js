//dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');

const {Post, User, Comment} = require('../models');
const withAuth = require('../utils/auth')

//render dashboard page
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        }, 
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: [user_name]
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    //render posts
    .then(dbPostData => {
        //serializes data by removing extra sequelize meta data
        const posts = dbPostData.map(post => post.get({plain: true}));
        //pass data into dashboard template
        res.render('dashboard', {
            posts, 
            loggedIn: true
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



//edit post route
router.get('/edit/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    //render post
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        //serializes data by removing extra sequelize meta data
        const post = dbPostData.get({plain: true});
        //pass data into edit-post template
        res.render('edit-post', {
            post, 
            loggedIn: true
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
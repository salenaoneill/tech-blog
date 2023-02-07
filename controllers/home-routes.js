//dependencies 
const router = require('express').Router();
const sequelize = require('../config/connection');
const {Post, User, Comment} = require('../models');

//render home page
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_text',
            'title',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
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
    //pass data into homepage template
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



router.get('/post/:id', (req, res) => {
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
                model: User,
                attributes: ['username']
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
    //render post
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        //serializes data by removing extra sequelize meta data
        const post = dbPostData.get({plain: true});
        //pass data into single-post template
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }) 
})

//render login page
//redirect user to homepage if user is already logged in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//render signup page
//redirect user to home page if user is already logged in
router.get('/signup', (req, res) => {
    if (req.session.logginIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;
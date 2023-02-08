//dependencies
const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//GET all users
router.get('/', (req, res) => {
    User.FindAll({
        attributes: {exlude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//GET a single user
router.get(':id', (req, res) => {
    User.findOne({
        attributes: {exclude: password},
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'post_text', 'created_at']
            }, 
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    //render single user
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//create a new user account
router.post('/', (req, res) => {
    if (req.session) {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        .then(dbUserData => {
            req.session.user_id = dbUserData.id;
            res.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});


//user login
router.post('login', (req, res) => {
    User.FindOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
            const validPassword = dbUserData.checkPassword(req.body.password);
            if (!validPassword) {
                res.status(404).json({message: 'Incorrect password'});
                return;
            }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!'})
        });
    });
});

//log out 
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
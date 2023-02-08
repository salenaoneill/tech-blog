//dependencies
const router = require('express').Router();
const {User, Post, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//render all posts
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
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


//render post
router.get('/:id', (req, res) => {
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
    //render single post
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post found with this id'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    }) 
})




//create a post
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Post.create({
            title: req.body.title,
            post_id: req.body.post_text,
            user_id: req.session.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});


//delete a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post with this id found'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



//update a post
router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'No post with this id found'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });

const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
//const sequelize = require('../../config');
const withAuth = require('../../utils/auth');

// ============================== GET all posts ============================ //

router.get('/', async (req, res) => {
    console.log('test get all posts');
    try {
      const dbPostData = await Post.findAll({
        include: [
          {
            model: Post,
            attributes: [
                'id', 
                'title', 
                'content', 
                'date_created'
            ],
            include: [{
                model: User,
                attributes: ['name'],
            },
            {
                model: Comment,
                attributes: [
                    'id', 
                    'text', 
                    'project_id', 
                    'user_id', 
                    'date_created' 
                ],
                include: {
                    mode: User,
                    attributes: [
                        'name'
                    ]
                }}]
          },
        ],
      });
      res.status(200).json(dbPostData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

  // ============================== GET one post by id ============================ //

router.get('/:id', async (req, res) => {
      try {
        const dbPostData = await Post.findOne({
          where: {
            id: req.params.id
          },
          attributes: [
            'id', 
            'title', 
            'content', 
            'date_created'
          ],
          include: [
            {
              model: User,
              attributes: [
                'name',
              ],
            },
            {
                model: Comment,
                attributes: [
                    'id', 
                    'text', 
                    'project_id', 
                    'user_id', 
                    'date_created' 
                ],
                include: {
                model: User,
                attributes: [
                    'name'
                ] 
                }
            },
          ],
        });
        res.status(200).json(dbPostData);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  );

// ============================== CREATE a new Post ============================ //

router.post('/', withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.create({
        user_id: req.session.user_id,
        title: req.body.title,
        text: req.body.content
      });    
      res.status(200).json(dbPostData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

// ============================== PUT/UPDATE a Post ============================ //

router.put('/:id', withAuth, async (req, res) => {
    // update a post by its `id` value
  try {
  const dbPostData = await Post.update({
  title: req.body.title,
  text: req.body.content
  }, 
  {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(dbPostData);
  } catch (err) {
      res.status(500).json(err);
    };
  });

// ============================== DELETE a Post by id ============================ //

router.delete('/:id', withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.destroy(
      {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(dbPostData);
      } catch (err) {
          res.status(500).json(err);
        };
      });

module.exports = router;
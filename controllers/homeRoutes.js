const router = require('express').Router();
const { Project, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


// ============== Get all projects and JOIN with user data ============= //

router.get('/', async (req, res) => {
  try {

    const projectData = await Project.findAll({
      attributes: ['id', 'name', 'description', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['name']
        },
        {
          model: Comment,
          attributes: ['id', 'text', 'project_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['name'],
          }
        },
      ],
    });

    // Serialize data so the template can read it
    const projects = projectData.map((project) => project.get({ plain: true }));
    console.log(projects)
    // Pass serialized data and session flag into template
    res.render('homepage', {
      projects,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============== get posts/projects by id ============= //

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'text', 'project_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['name'],
          }
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============== get all posts' comments ============= //

router.get('/comments', async (req, res) => {
  try {
    const commentData = await Project.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'description', 'date_created'],
      include: [{
        model: Comment,
        attributes: ['id', 'text', 'project_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: User,
        attributes: ['name']
      }
      ]
    });
    console.log(commentData)
    const project = commentData.get({ plain: true });
    res.render('comments', { ...project, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ============== get posts/projects by id to update ============= //

// this creates the /update URL page

router.get('/update/:id', async (req, res) => {
  try {
    const projectData = await Project.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'description', 'date_created'],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['id', 'text', 'project_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ['name'],
          }
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('update', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/////////////////////////////////////////////////////////////////////

// ========================== pass current session user's name to hb =============== //
router.get('/project/:id', function(req, res) {
  res.render('project', {
    name: req.session.name // Assuming user information is stored in req.user
  });
});

// =========================== Logging in ====================== //

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Project }
      ],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/////////////////////////////////////////////////////////////////////

// ===== login page ==== //

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// ===== signup page ==== //

router.get('/signup', (req, res) => {
  res.render('signup');
});


module.exports = router;

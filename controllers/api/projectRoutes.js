const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');

// ================ create a new post

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

// ================ delete a post

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/////////////////////////////////////////////////////////////////////

// ================ update a post /////////////////////////////////

 // [two]

 router.get('update/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'description', 'date_created'],
    });

const project = projectData.get({ plain: true });
res.render(`update`, { project, loggedIn: true, username: req.session.username });

    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(`/update`, withAuth, (req, res) => {
  res.render('update', { name: req.session.name });
});

/////////////////////////////////////////////////////////////////////

module.exports = router;

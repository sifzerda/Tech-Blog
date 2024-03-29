/////////////////////////////////////////////////////////////////
// [one]
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
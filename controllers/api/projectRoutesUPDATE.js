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
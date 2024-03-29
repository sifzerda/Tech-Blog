const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');

// ========================================= //
//            Model Associations             //
// ========================================= //

// https://sequelize.org/docs/v6/core-concepts/assocs/

// =============== Associations =============//

// HasOne 
// BelongsTo
// HasMany
// BelongsToMany

// =========== Association Types ============//

// One-To-One
// One-To-Many
// Many-To-Many

User.hasMany(Project, {              /////////////////
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
   });

Project.belongsTo(User, {            /////////////////
  foreignKey: 'user_id'
});

// Posts ======================== //

Project.hasMany(Comment, {           /////////////////
  foreignKey: 'project_id',
  onDelete: 'CASCADE'
});

// Comments ====================== //

Comment.belongsTo(User, {            /////////////////
  foreignKey: 'user_id'
});

Comment.belongsTo(Project, {         /////////////////
  foreignKey: 'project_id'
});

module.exports = { User, Project, Comment };

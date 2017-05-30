'use strict'

const Sequelize = require( 'sequelize' );
const env = require( './env' );
const sequelize = new Sequelize( env.DATABASE_NAME, env.DATABASE_USERNAME, env.DATABASE_PASSWORD, {
	host: env.DATABASE_HOST,
	port: env.DATABASE_PORT,
	dialect: env.DATABASE_DIALECT,
	define: {
		underscored: true
	},
	storage: env.DATABASE_STORAGE
} );

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.todos = require( '../models/todos.js' )( sequelize, Sequelize );
// db.subtasks = require( '../models/subtasks.js' )( sequelize, Sequelize );

//Relations
// db.subtasks.belongsTo( db.todos );
// db.todos.hasMany( db.subtasks );

module.exports = db;
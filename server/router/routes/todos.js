module.exports = ( app, db ) => {

	// GET all owners
	app.get( '/todos', ( req, res ) => {
		db.todos.findAll()
			.then( todos => {
				res.json( todos );
			} );
	} );
};
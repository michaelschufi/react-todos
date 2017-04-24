import models from "../../models"

export let getTodos = ( req, res ) =>  {
	models.Todo.findAll()
	.then( todos => {
		res.json( {
			count: todos.length,
			todos: todos
		} )
	} )
}
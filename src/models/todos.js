module.exports = function( sequelize, DataTypes ) {
	var Todo = sequelize.define( "Todo", {
		title: DataTypes.STRING
	} )

	return Todo;
};
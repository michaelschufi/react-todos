module.exports = ( sequelize, DataTypes ) => {
	const Todos = sequelize.define( 'todos', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT
		},
		estimatedTime: {
			type: DataTypes.INTEGER
		},
		deadline: {
			type: DataTypes.DATE
		},
		startTime: {
			type: DataTypes.DATE
		},
		folder: {
			type: DataTypes.STRING
		},
		done: {
			type: DataTypes.BOOLEAN
		}
	} );
	return Todos;
};
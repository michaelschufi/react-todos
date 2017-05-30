const routes = [
  require( './routes/todos' ),
];


module.exports = function router( app, db ) {
  return routes.forEach( ( route ) => {
    route( app, db );
  } );
};
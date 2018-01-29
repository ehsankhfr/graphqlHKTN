var express = require('express');
var router = express.Router();

var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
	hello: () => {
		return 'Hello world!';
	},
};

/* GET users listing. */
router.use('/gql', graphqlHTTP({
		schema: schema,
		rootValue: root,
		graphiql: true,
	})
);

module.exports = router;

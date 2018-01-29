var express = require('express');
var router = express.Router();

var graphqlHTTP = require('express-graphql');
var { buildSchema, graphql } = require('graphql');

const rootSchema = require('../schema/rootSchema');

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
router.use('/graphiql', graphqlHTTP({
		schema: rootSchema,
		pretty: true,
		graphiql: true
	})
);

router.get('/', (req, res) => {
	const graphqlQuery = req.query.graphqlQuery;
	if (!graphqlQuery) {
		return res.status(500).send('You must provide a query');
	}

	return graphql(rootSchema, graphqlQuery)
		.then(response => response.data)
		.then((data) => res.json(data))
		.catch((err) => console.error(err));
});

module.exports = router;

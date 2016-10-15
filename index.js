
console.log('Loading restify server...');

var _ = require('lodash');
var restify		= require('restify');
var api = restify.createServer({name: 'angular-1-starter-api'});
api.listen(process.env.PORT || 8080, function() {
	console.log('%s listening at %s', api.name, api.url);
});

// api.pre(restify.CORS({
// 	origins: ['*'],
// 	credentials: false,
// 	headers: ['X-Requested-With', 'Authorization']
// }));

api.pre(restify.fullResponse());
api.use(restify.bodyParser());
api.use(restify.queryParser());

api.get('/api/ping', function(req, res)
{
	console.log('ping called');
	res.send(200, {response: true});
});

api.get('/api/dice', function(req, res)
{
	const type = parseInt(req.params.type);
	const amount = parseInt(req.params.amount);
	if(okNumber(type) === false)
	{
		return res.send(500, {response: false, error: "Type is not a number."});
	}
	if(okNumber(amount) === false)
	{
		return res.send(500, {response: false, error: "Amount is not a number."});
	}
	res.send(200, {response: true, data: roll(amount, type)});
});

function okNumber(o)
{
	return _.isNumber(o) && _.isNaN(o) === false;
}

function roll(amount, type)
{
	var start = _.fill(Array(amount), 0);
	var results = _.reduce(start, (sum, i) => {
		sum += getRandomNumberFromRange(1, type);
		return sum;
	}, 0);
	return results;
}

function getRandomNumberFromRange(start, end)
{
	var range = end - start;
	var result = Math.random() * range;
	result += start;
	return Math.round(result);
}

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

// This is because the ingress-nginx controller we are using cant route traffic
// based on HTTP verb, so we need different paths for GET /posts and POST /posts
// if we want them to go to different backends.
app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/posts/create', async (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;

	posts[id] = {
		id, title
	};

	await axios.post('http://event-bus-srv:4005/events', {
		type: 'PostCreated',
		data: {
			id, title
		}
	});

	res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
	console.log('Received Event', req.body.type);
	res.send({});
});

app.listen(4000, () => {
	console.log('v1000');
	console.log('Listening on 4000');
});

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
	.engine('html', require('ejs').renderFile)
	.set('view engine', 'ejs')
	.set('views', './src/views');

const Message = mongoose.model('Message', {
	name : String,
	message : String,
});

const dbUrl = 'mongodb://localhost:27017/realtimemessage';

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/messages', (req, res) => {
	Message.find({}, (err, messages)=> {
		res.send(messages);
	});
});


app.get('/messages/:user', (req, res) => {
	const user = req.params.user;
	Message.find({ name: user }, (err, messages)=> {
		res.send(messages);
	});
});


app.post('/messages', async (req, res) => {
	try{
		const message = new Message(req.body);

		await message.save();
		console.log('saved');

		const censored = await Message.findOne({ message:'badword' });
		if (censored) {
			await Message.remove({ _id: censored.id });
		} else {
			io.emit('message', req.body);
		}
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(500);
		return console.log('error', error);
	} finally{
		console.log('Message Posted');
	}

});


io.on('connection', () =>{
	console.log('a user is connected');
});

mongoose.connect(dbUrl, {
	useNewUrlParser: true,
	autoIndex: false,
	connectTimeoutMS: 10000,
	family: 4,
	useUnifiedTopology: true,
}, (err) => {
	console.log('mongodb connected', err);
});

const server = http.listen(3000, () => {
	console.log('server is running on port', server.address().port);
});

const express = require('express');
const router = express.Router();
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const Sales = require('../models/sales');

// socket io
io.on('connection', (socket) =>
	socket.on('updatedata', (data) => io.emit('udpate-data', { data: data }))
);

// list data
router.get('/', (req, res, next) =>
	Sales.find((err, sales) => {
		if (err) return next(err);
		res.json(sales);
	})
);

// item sales report
router.get('/itemsales', (req, res, next) =>
	Sales.aggregate([
		{
			$group: {
				_id: { itemId: '$itemId', itemName: '$itemName' },
				totalPrice: {
					$sum: '$totalPrice',
				},
			},
		},
		{
			$sort: { totalPrice: 1 },
		},
		(err, sales) => {
			if (err) return next(err);
			res.json(sales);
		},
	])
);

// get data by id
router.get('/:id', (req, res, next) =>
	Sales.findById(req.params.id, (err, sales) => {
		if (err) return next(err);
		res.json(sales);
	})
);

// post data
router.post('/', (req, res, next) =>
	Sales.create(req.body, (err, sales) => {
		if (err) {
			console.log(err);
			return next(err);
		}
		res.json(sales);
	})
);

//put data
router.put('/:id', (req, res, next) =>
	Sales.findByIdAndUpdate(req.params.id, req.body, (err, sales) => {
		if (err) {
			console.log(err);
			return next(err);
		}
		res.json(sales);
	})
);

// delete data by id
router.delete('/:id', (req, res, next) =>
	Sales.findByIdAndDelete(req.params.id, req.body, (err, sales) => {
		if (err) return next(err);
		res.json(sales);
	})
);

module.exports = router;
server.listen(4000);

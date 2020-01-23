const express = require('express');
const db = require('./model');

const app = express.Router();

// fetch all schemes
app.get('/', (request, response) => {
    db.find()
		.then(res => response.status(200).json(res))
		.catch(err => response.status(500).json({message: 'error fetching schemes'}));
});

// fetch scheme
app.get('/:id', (request, response) => {
    db.findById(request.params.id)
		.then(res => res ? response.status(200).json(res) : response.status(404).json({message: 'scheme with specified id does not exist'}))
		.catch(err => response.status(500).json({message: 'error fetching scheme'}));
});

// fetch scheme's steps
app.get('/:id/steps', (request, response) => {
    db.findSteps(request.params.id)
		.then(res => res.length ? response.status(200).json(res) : response.status(404).json({message: 'scheme with specified id does not exist'}))
		.catch(err => response.status(500).json({message: 'error fetching steps'}));
});

// create scheme
app.post('/', (request, response) => {
    db.add(request.body)
		.then(res => response.status(201).json(res))
		.catch (err => response.status(500).json({message: 'error creating scheme'}));
});

// create step
app.post('/:id/steps', (request, response) => { 
    db.findById(request.params.id)
		.then(res => res ? (
			db.addStep(request.body, request.params.id)
				.then(r => response.status(200).json(r))
		) : res.status(404).json({message: 'scheme with specified id not found'}))
		.catch (err => response.status(500).json({message: 'error fetching scheme'}));
});

// update scheme
app.put('/:id', (request, response) => {
    db.findById(request.params.id)
		.then(res => res ? (
			db.update(request.body, request.params.id)
				.then(r => response.status(200).json(r))
				.catch(e => response.status(500).json({message: 'error updating scheme'}))
		) : response.status(404).json({message: 'scheme with specified id not found'}))
		.catch (err => response.status(500).json({message: 'error fetching scheme'}));
});

// delete scheme
app.delete('/:id', (request, response) => {
    db.remove(request.params.id)
		.then(res => res ? response.status(200).json({message: 'successfully deleted scheme'}) : response.status(404).json({message: 'scheme with specified id does not exist'}))
		.catch(err => response.status(500).json({message: 'error deleting scheme'}));
});

module.exports = app;
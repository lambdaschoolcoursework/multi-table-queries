const express = require('express');
const db = require('../data/config');

const app = express.Router();

app.get('/', (req, res) => {
    db.find()
		.then(schemes => {
			res.json(schemes);
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get schemes' });
		});
});
  
app.get('/:id', (req, res) => {
    const { id } = req.params;
  
    db.findById(id)
		.then(scheme => {
			if (scheme) {
				res.json(scheme);
			} else {
				res.status(404).json({ message: 'Could not find scheme with given id.' })
			};
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get schemes' });
		});
});
  
app.get('/:id/steps', (req, res) => {
    const { id } = req.params;
  
    db.findSteps(id)
		.then(steps => {
			if (steps.length) {
				res.json(steps);
			} else {
				res.status(404).json({ message: 'Could not find steps for given scheme' })
			};
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to get steps' });
		});
});
  
app.post('/', (req, res) => {
    const schemeData = req.body;
  
    db.add(schemeData)
		.then(scheme => {
			res.status(201).json(scheme);
		})
		.catch (err => {
			res.status(500).json({ message: 'Failed to create new scheme' });
		});
});
  
app.post('/:id/steps', (req, res) => {
    const stepData = req.body;
    const { id } = req.params; 
  
    db.findById(id)
		.then(scheme => {
			if (scheme) {
				db.addStep(stepData, id)
					.then(step => {
						res.status(201).json(step);
					})
			} else {
				res.status(404).json({ message: 'Could not find scheme with given id.' })
			};
		})
		.catch (err => {
			res.status(500).json({ message: 'Failed to create new step' });
		});
});
  
app.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db.findById(id)
		.then(scheme => {
			if (scheme) {
				db.update(changes, id)
					.then(updatedScheme => {
						res.json(updatedScheme);
					});
			} else {
				res.status(404).json({ message: 'Could not find scheme with given id' });
			};
		})
		.catch (err => {
			res.status(500).json({ message: 'Failed to update scheme' });
		});
});
  
app.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    db.remove(id)
		.then(deleted => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res.status(404).json({ message: 'Could not find scheme with given id' });
			};
		})
		.catch(err => {
			res.status(500).json({ message: 'Failed to delete scheme' });
		});
});

module.exports = app;
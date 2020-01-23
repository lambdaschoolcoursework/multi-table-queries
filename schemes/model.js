const db = require('../data/config');

const find = () => {
    return db('schemes');
};

const findById = id => {
    return db('schemes').where({id}).first();
};

const findSteps = id => {
    return db('steps')
        .join('schemes', 'steps.scheme_id', '=', 'schemes.id')
        .where('steps.scheme_id', id)
        .select('steps.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions');
};

const add = scheme => {
    return db('schemes').insert(scheme);
};

const addStep = (step, id) => {
    return db('steps').insert(step);
};

const update = (scheme, id) => {
    return db('schemes').where({id}).update(scheme);
};

const remove = id => {
    return db('schemes').where('id', id).del();
};

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
};
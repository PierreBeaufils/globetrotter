const db = require('../database');
const CoreModel = require ('./CoreModel');

class Task extends CoreModel {

    static tableName = 'task';

    constructor (data) {
        super(data);
        for (const prop in data){
            this[prop] = data[prop];
        }
    }
}

module.exports = Task;
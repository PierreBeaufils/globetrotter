const db = require('../database');
const CoreModel = require("./CoreModel");

class Transport extends CoreModel {

        static tableName = 'transport';

    constructor (data) {
        super(data);
        for (const prop in data){
            this[prop] = data[prop];
        }
    }

    

}

module.exports = Transport;
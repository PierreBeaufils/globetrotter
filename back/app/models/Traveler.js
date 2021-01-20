const db = require('../database');
const CoreModel = require ('./CoreModel');

class Traveler extends CoreModel {

    static tableName = 'traveler';

    constructor (data) {
        super(data);
        for (const prop in data){
            this[prop] = data[prop];
        }
    }
    
    static async findByEmail(email) {
        const user = await db.query ('SELECT * FROM traveler WHERE email=$1', [email]);
        return user.rows[0];
    }
    
    
}

module.exports = Traveler;
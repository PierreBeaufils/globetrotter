const db = require('../database');
const CoreModel = require('./CoreModel');

class travel_has_traveler {

    static tableName = 'travel_has_traveler';

    constructor (data) {
        // super(data);
        for (const prop in data){
            this[prop] = data[prop];
        }
    }

    static async findTravelersByTravel(travelId) {
        const travelers = await db.query (`
        SELECT traveler_id, first_name, last_name, phone, email
        FROM travel_has_traveler
        JOIN travel ON travel_has_traveler.travel_id = travel.id
        JOIN traveler ON travel_has_traveler.traveler_id = traveler.id
        WHERE travel_has_traveler.travel_id = $1
        `, [travelId]);

        return travelers.rows;
    }

    static async findOneTravelerByTravel(travelId, travelerId) {
        const OneTraveler = await db.query (`
        SELECT *
        FROM travel_has_traveler
        WHERE travel_id = $1 AND traveler_id = $2;
        `, [travelId, travelerId]);

        return OneTraveler.rows[0];
    }

    async saveTravelerIntoTravel () {
        await db.query (`
        INSERT INTO travel_has_traveler (travel_id, traveler_id)
        VALUES ($1, $2);
        `, [this.travel_id, this.traveler_id]);
    }

    update(data){
        for(const prop in data){
            this[prop] = data[prop];
        }
    }

    async deleteTraveler() {
        // console.log(this);
        await db.query (`
        DELETE FROM travel_has_traveler
        WHERE travel_id = $1
        AND traveler_id = $2
        `, [this.travel_id, this.traveler_id]);
    }

    
}

module.exports = travel_has_traveler;
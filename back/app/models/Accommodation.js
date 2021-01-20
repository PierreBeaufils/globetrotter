const db = require('../database');
const CoreModel = require("./CoreModel");

class Accommodation extends CoreModel {

    // _coordinate;

    static tableName = 'accommodation';

    constructor (data) {
        super(data);
        for (const prop in data){
            this[prop] = data[prop];
            if (prop === "coordinate") {
               if (typeof(this.coordinate) === 'object') {
                   this.coordinate = this.transformCoordinates(this.coordinate);
               }
            }
        }
    }

        transformCoordinates(value) {
        let rawCoordinate = [];
        for (const key in value) {
            rawCoordinate.push(value[key]);
        }

        rawCoordinate = rawCoordinate.join(",");

        return rawCoordinate;
    }

    // get test() {
    //     return this.makeSomethin();
    // }

    // makeSomethin() {
    //     return "nothing";
    // }

    // static async findAllOfTravel(travelId){
    //     const accomodations = await db.query('SELECT * FROM accomodation WHERE travel_id = $1 ;', [travelId]);
    //     return s.rows;
    // }

    // update(data){
    //     for(const prop in data){
    //         this[prop] = data[prop];
    //     }
    // }


    // async save() {
    //     if (this.id) {
    //         await db.query (`
    //         UPDATE  SET
    //         "name"=$1,"adress"=$2,"city"=$3,"coordinate"=$4,"information"=$5,"availability"=$6,"arrival_date"=$7,"departure_date"=$8,"unit_price"=$9,"quantity"=$10,"travel_id"=$11 WHERE id= $12 ;
    //         `, [
    //             this.name,
    //             this.adress,
    //             this.city,
    //             this.coordinate,
    //             this.information,
    //             this.availability,
    //             this.arrival_date,
    //             this.departure_date,
    //             this.unit_price,
    //             this.quantity,
    //             this.travel_id,
    //             this.id
    //         ]);
    //     } else {
    //         await db.query(`
    //         INSERT INTO  ("name","adress","city","coordinate","information","availability","arrival_date","departure_date","unit_price","quantity","travel_id")
    //         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    //         RETURNING id;`
    //         , [
    //             this.name,
    //             this.adress,
    //             this.city,
    //             this.coordinate,
    //             this.information,
    //             this.availability,
    //             this.arrival_date,
    //             this.departure_date,
    //             this.unit_price,
    //             this.quantity,
    //             this.travel_id,
    //         ])
    //     }
    // }

        
    
}

module.exports = Accommodation;
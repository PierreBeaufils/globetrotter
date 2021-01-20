const db = require('../database');
const CoreModel = require("./CoreModel");

class Activity extends CoreModel {

        static tableName = 'activity';

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

    
}

module.exports = Activity;
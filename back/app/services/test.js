const Document = require("../models/Document");
async function test() { 
const document1 = await new Document({
    Key: "15/public/Banane peze horizontal.mp4",
    url: ".s3.amazonaws.com/",
    travel_id: 15
});


// console.log(await document1);
console.log(document1);
}
test();




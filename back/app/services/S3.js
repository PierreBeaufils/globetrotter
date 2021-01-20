const AWS = require("aws-sdk");
const uuid = require("uuid");
const errorMessage = "Une erreur c'est produite :";

const S3 = async () => {
  let data = await new AWS.S3();
  // console.log(data);
  return data;
}

S3();

const S3Object = {

   getAllObjects:  (objectParams) => {
      S3.listObjectsV2(objectParams, (err,results) => {
        if (err) {
            console.log(err);
            return errorMessage + err;
        } else {
        return results;
    }
    })
}

};



module.exports = S3Object;

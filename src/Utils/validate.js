const  mongoose  = require("mongoose");
const { isEmpty ,isLength} = require("validator");

function createSpaceValidator(req) {
  const { type, spaceName } = req.body;

  const allowedFields = ["type", "capacity", "pricePerUnit" , "spaceName" , "occupied"];
  const allowedTypes = ["hanger", "shelf"];

  const fieldList = Object.keys(req.body);

  const isValid = fieldList.every((item) => allowedFields.includes(item));

  if (!isValid) {
    throw new Error("unnecessary field");
  }

  if (!allowedTypes.includes(type)) {
    throw new Error("Invalid space type");
  }

  if(!isLength(spaceName ,{min:3 , max:16})){
    throw new Error("space name must be 3 to 16 character");
  }
}



const validateObjectId = function (id){
  return mongoose.Types.ObjectId.isValid(id)
}

module.exports = { createSpaceValidator, validateObjectId };

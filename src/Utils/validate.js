const  mongoose  = require("mongoose");
const { isEmpty } = require("validator");

function createSpaceValidator(req) {
  const { type } = req.body;

  const allowedFields = ["type", "capacity", "pricePerUnit"];
  const allowedTypes = ["hanger", "shelf"];

  const fieldList = Object.keys(req.body);

  const isValid = fieldList.every((item) => allowedFields.includes(item));

  if (!isValid) {
    throw new Error("unnecessary field");
  }

  if (!allowedTypes.includes(type)) {
    throw new Error("Invalid space type");
  }
}



const validateObjectId = function (id){
  return mongoose.Types.ObjectId.isValid(id)
}

module.exports = { createSpaceValidator, validateObjectId };




const mongoose = require('mongoose');
const { CONNECTION_STRING, DB_NAME } = require('../Utils/constant');



async function connectToDb() {
    try {
        await mongoose.connect(CONNECTION_STRING + DB_NAME);
        console.log("Connected to DB");
    } catch (err) {
        console.log("Error occurred while connecting to db");
    }
}


module.exports = connectToDb;


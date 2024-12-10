

// CREATE TABLE spaces (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT NOT NULL,
//     type TEXT CHECK(type IN ('hanger', 'shelf')) NOT NULL,
//     capacity INTEGER NOT NULL,
//     occupied INTEGER DEFAULT 0,
//     price_per_unit DECIMAL(10,2) NOT NULL,
//     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
// );



const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
    allocatedUserName: {
        type: String,
        trim: true
    },
    type:{
        type:String,
        enum:["hanger","shelf"],
        validate(value){
            if(!["hanger","shelf"].includes(value)){
                throw new Error("Invalid space type");
            }
        }
    },
    capacity:{
        type:Number,
        required:true,
        min:1
    },
    occupied:{
        type:Number,
        default:0
    },
    pricePerUnit:{
        type:Number,
        required:true
    }

},{timestamps:true})



spaceSchema.methods.calculatePrice = function (){
    const occupiedUnits = this.capacity - this.occupied;
    const PER_UNIT_FARE = 40;
    const totalPrice = occupiedUnits * PER_UNIT_FARE;
    return totalPrice;

}

module.exports = mongoose.model("space",spaceSchema);

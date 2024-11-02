const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ambulanceSchema = new Schema({
    Ambulance_no: {
        type : String,
        required: true,
    },
    hospitalId: {
        type : String,
        required: true
        
    
    }
});

const Ambulance = mongoose.model('Ambulance', ambulanceSchema);
module.exports = Ambulance;
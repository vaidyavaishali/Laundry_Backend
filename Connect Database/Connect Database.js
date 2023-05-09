const mongoose = require("mongoose")

mongoose.set('strictQuery', true);

const connect_database = () => {
    return mongoose.connect("mongodb+srv://laundry:laundry@laundry.cdb0y1m.mongodb.net/?retryWrites=true&w=majority").then(() => {
        console.log("Database Connected");
    }).catch((e) => {
        console.log(e.messsge);
    })
}

module.exports = connect_database;
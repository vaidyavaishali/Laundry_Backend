const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },

    orderDetails: { type: Array, default: [] },

    date_time: {
        type: String,
        required: true
    },
    total_items: {
        type: String,
        required: true
    },
    store: {
        type: String
    },
    price: {
        type: String
    },
    status: String,
    city: String,
    phone:String

}, { versionkey: false })

const Order = mongoose.model("orders", OrderSchema)

module.exports = Order;
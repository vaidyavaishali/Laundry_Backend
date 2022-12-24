// Imports
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const connect_database = require("./Connect Database/Connect Database")

// App Configs
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("common"))
const PORT = 8000

// Routes

app.use("/users", require("./Routes/User_Routes"))
app.use("/orders", require("./Routes/Order_Routes"))


////


// Connect to database and server listining
app.listen(8000, async () => {
    await connect_database()
    console.log(`Server up at port ${PORT}`);
})
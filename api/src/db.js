const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL).catch((err) => console.log(err))


// used to connect to MongoDB

const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_CONN || "mongodb+srv://umerbandesha007@_db_user:*****@cluster0.i5fdbh6.mongodb.net/";

mongoose.connect(mongo_url, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

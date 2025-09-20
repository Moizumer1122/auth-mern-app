
// used to connect to MongoDB

const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_CONN || "mongodb://localhost:27017/auth-mern-app";

mongoose.connect(mongo_url, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

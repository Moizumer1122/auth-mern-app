const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Schema is used to make structure of the document in the collection
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});
// user model is used tp interact with the users collection in the database
const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
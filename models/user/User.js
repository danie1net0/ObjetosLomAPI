const { Schema, model } = require('mongoose');
const paginate = require('mongoose-paginate');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, {
    timestamps: true
});

UserSchema.plugin(paginate);

module.exports = model('User', UserSchema);
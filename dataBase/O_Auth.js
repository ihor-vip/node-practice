const {model, Schema} = require('mongoose');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        trim: true,
        required: true
    },

    refresh_token: {
        type: String,
        trim: true,
        required: true
    },

    user_id: {
        type: Schema.Types.ObjectId,
        trim: true,
        required: true,
        ref: 'user'
    }
});

module.exports = model('o_auth', oAuthSchema);

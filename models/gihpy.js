const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    url: String,
    title: String,
    category: String,
    createdBy: String,
    views: String,
    rating: String,
    tags: String,
    created_at: Date,
    reviews: [
        {
            user_id: String,
            user_name: String,
            reviewComment: String
        }
    ]
});

module.exports = mongoose.model('Giphy', userSchema);
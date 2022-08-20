const mongoose = require('mongoose')

const Room = new mongoose.Schema(
    {
        name: { type: String, required: true },
        roomId: { type: String, required: true },
    },
)

const Mentor = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        skills: { type: Array },
        rooms: [Room],
        bio: { type: String },
        links: { type: Array }
    },
    { collection: 'mentor-data' }
)

const model = mongoose.model('MentorData', Mentor)

module.exports = model
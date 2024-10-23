const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
    total_kwh: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    algo_status: {
        type: String,
        enum: ['ON', 'OFF'],
        default: 'OFF'
    }
});

module.exports = mongoose.model('ChartData', chartDataSchema);
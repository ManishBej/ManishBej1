const express = require('express');
const router = express.Router();
const ChartData = require('../models/ChartData');
const auth = require('../middleware/auth');

// Get all chart data
router.get('/', auth, async (req, res) => {
    try {
        const data = await ChartData.find().sort({ createdAt: 1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Add new data point
router.post('/', auth, async (req, res) => {
    try {
        const { total_kwh, algo_status } = req.body;
        const newData = new ChartData({
            total_kwh,
            algo_status
        });
        await newData.save();
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Filter data by date range
router.get('/filter', auth, async (req, res) => {
    try {
        const { startDate, endDate, algo_status } = req.query;
        let query = {};
        
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }
        
        if (algo_status) {
            query.algo_status = algo_status;
        }
        
        const data = await ChartData.find(query).sort({ createdAt: 1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
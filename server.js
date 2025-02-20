require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors({ origin: "https://weatherfurywithbackend.netlify.app" })); // Allow frontend requests

const PORT = process.env.PORT || 5000;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

// API route to get weather data
app.get('/', async (req, res) => {
    try {
        const { city } = req.query; // Get city from frontend
        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }

        const response = await axios.get(`${WEATHER_API_URL}?q=${city}&appid=${process.env.WEATHER_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
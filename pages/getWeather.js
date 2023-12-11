const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors middleware for cross-origin resource sharing

const weatherAPIkey = '42eac8752d7a3bf35e537584bcde6a11';
const countryCode = 'US';

const app = express();
const PORT = 3001;

app.use(cors()); // Use the cors middleware
app.use(express.json());

app.post('/getWeather', async (req, res) => {
  const { zipCode } = req.body;

  try {
    // Convert Zip Code to Lat/Lon
    const locationResponse = await axios.get(
      `https://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${weatherAPIkey}`
    );

    //log response to console for error checking
    //console.log(locationResponse.data);

    // Extract Lat/Lon from response
    const lat  = locationResponse.data.lat;
    const lon  = locationResponse.data.lon;

    // Get Weather Data using Lat/Lon
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=42eac8752d7a3bf35e537584bcde6a11`
    );
    
    //log response to console for error checking
    console.log(weatherResponse.data);

    // Extract specific weather information
    const { temp, humidity, pressure } = weatherResponse.data.main;
    const { description } = weatherResponse.data.weather[0];

    // Send the parsed weather data in the response
    res.json({
      success: true,
      data: {
        temp,
        humidity,
        description,
        pressure,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

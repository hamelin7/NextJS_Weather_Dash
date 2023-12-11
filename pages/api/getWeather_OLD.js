const weatherAPIkey = process.env.WEATHER_API_KEY;
const countryCode = 'US';

const express = require('express');
const axios = require('axios');
const fs = require('fs/promises');

const app = express();
const PORT = 3001;

app.use(express.json());

const getDataFromFile = async (fileName) => {
  try {
    const data = await fs.readFile(fileName, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

const shouldUpdateData = async (fileName) => {
  try {
    const stats = await fs.stat(fileName);
    const lastModifiedTime = new Date(stats.mtime);
    const currentTime = new Date();

    //Check if the $ZIP_CODE.JSON file is more than 1 minute old
    const minutesDifference = (currentTime - lastModifiedTime) / (1000 * 60);
    return minutesDifference > 1;
  } catch (error) {
    return true; // File doesn't exist or other error, update the data
  }
};

app.post('/getWeather', async (req, res) => {
  const { zipCode } = req.body;

  try {
    const fileName = `../weather_data/${zipCode}.json`;
    //commented out for testing
    if (await shouldUpdateData(fileName)) {
      // File is either older than 1 minute or doesn't exist, fetch data from OpenWeatherMap

      //Convert Zip Code to Lat/Lon with URL
      const locationResponse = await axios.get(
        `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${weatherAPIkey}`
      );

      const { lat, lon } = locationResponse.data.coord;

      //Get Weather Data using Lat/Lon URL
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIkey}`
      );

      //Save Data to JSON File
      await fs.writeFile(fileName, JSON.stringify(weatherResponse.data));
    }

    //Read data from the file and send it in the response
    const data = await getDataFromFile(fileName);

    res.json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
import React from "react";
import Header from "../components/header.jsx";
import { useState } from "react";
import axios from "axios";
import styles from "../styles/weather.module.css";

export default function Weather() {
  const [zipCode, setZipCode] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/getWeather",
        { zipCode },
      );
      //print response to console for error checking
      console.log(response.data);

      // Extract specific weather information
      const temp  = response.data.data.temp;
      const humidity = response.data.data.humidity;
      const pressure = response.data.data.pressure;
      const description = response.data.data.description;

      // Set the weather data to be displayed
      setWeatherData({
        temp,
        humidity,
        description,
        pressure,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      // error handling
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <label>
          Zip Code:
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </label>
        <button  type="submit">Get Weather</button>
      </form>
      <br />
      <br />
      {weatherData && (
        <div className={styles.weatherContainer}>
        <div className={styles.dataBox}>
          <h2>Temperature</h2>
          <p>{weatherData.temp} F</p>
        </div>

        <div className={styles.dataBox}>
          <h2>Humidity</h2>
          <p>{weatherData.humidity} %</p>
        </div>

        <div className={styles.dataBox}>
          <h2>Description</h2>
          <p>{weatherData.description}</p>
        </div>

        <div className={styles.dataBox}>
          <h2>Pressure</h2>
          <p>{weatherData.pressure} hPa</p>
        </div>
      </div>
      )}
    </div>
  );
}

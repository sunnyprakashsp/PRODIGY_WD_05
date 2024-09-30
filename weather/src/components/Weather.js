import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const [weather, setWeather] = useState(null);  // Initialize as null to handle cases with no data
  const [form, setForm] = useState({
    city: "",
    country: "",
  });
  const [error, setError] = useState(null); // Error state for handling API errors

  const APIKEY = "3306da8ced7b1f9d4adb784452d0ec13"; // Make sure you enter your actual API key

  async function weatherData(e) {
    e.preventDefault();
    if (form.city === "") {
      alert("jaipur");
    } else {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&APPID=${APIKEY}`
        );
        const data = await response.json();

        // Check if the API returned valid data or an error
        if (response.ok) {
          setWeather({ data: data });
          setError(null); // Clear any previous errors
        } else {
          setError(data.message); // Capture error message from API
          setWeather(null); // Clear previous weather data
        }
      } catch (error) {
        setError("Failed to fetch weather data.");
        setWeather(null); // Clear previous weather data
      }
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "city") {
      setForm({ ...form, city: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }
  };

  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="City"
          name="city"
          onChange={handleChange}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={handleChange}
        />
        <button className="getweather" onClick={weatherData}>
          Submit
        </button>
      </form>

      {/* Display error message if it exists */}
      {error && <div className="error">Error: {error}</div>}

      {/* Display weather data if available */}
      {weather && weather.data ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;

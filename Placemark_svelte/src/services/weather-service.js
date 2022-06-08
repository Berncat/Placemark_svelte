import axios from "axios";

export class WeatherService {
  apiKey = "";

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getWeather(lat, lon) {
    try {
      const response = await axios.get(
        "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +
        "&lon=" + lon + "&units=metric&appid=" + this.apiKey
      );
      const result = response.data.current
      const text = "Weather:\nLat: " + lat + " Lon: " + lon +  "\nTemp: " + result.temp + "C  Wind Speed: " + result.wind_speed + "m/s  Wind Direction: " + result.wind_deg + " degrees"
      return text;
    } catch (error) {
      return "Error getting weather reading";
    }
  }
}
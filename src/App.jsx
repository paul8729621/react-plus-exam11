import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import "./style.css";

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [locationName, setLocationName] = useState("현재 위치");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiKey = "cf801b131ae6103c066c1efb65fe15b2";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        await fetchWeather(latitude, longitude);
      },
      err => {
        console.error("위치 접근 실패:", err);
        setError("위치 정보를 가져올 수 없습니다.");
        setLoading(false);
      }
    );
  }, []);

  const fetchWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=kr`;

    try {
      const res = await axios.get(url);
      const list = res.data.list;
      const city = res.data.city.name;

      setLocationName(city);

      const daily = list.filter((_, index) => index % 8 === 4).slice(0, 5);
      setWeatherData(daily);
    } catch (err) {
      console.error("API 호출 실패:", err);
      setError("날씨 데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>{locationName} - 5Days Weather</h1>
      {loading && <p> 위치 기반 날씨를 불러오는 중...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="card-container">
        {weatherData.map((item, idx) => (
          <WeatherCard key={idx} data={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
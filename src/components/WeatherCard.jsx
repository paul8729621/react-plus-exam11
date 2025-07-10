import React from "react";
import dayjs from "dayjs";

function WeatherCard({ data }) {
  const { dt_txt, weather, main } = data;
  const date = dayjs(dt_txt).format("YYYY. M. D.");
  const description = weather?.[0]?.description ?? "정보 없음";
  const temp = main?.temp?.toFixed(2) ?? "?";

  const getIcon = () => {
    if (description.includes("흐림")) return "🌥️";
    if (description.includes("구름")) return "☁️";
    if (description.includes("비")) return "🌧️";
    return "🌤️";
  };

  return (
    <div className="weather-card">
      <div className="date">{date}</div>
      <div className="icon">{getIcon()}</div>
      <div className="desc">{description}</div>
      <div className="temp">🌡 {temp}°C</div>
    </div>
  );
}

export default WeatherCard;
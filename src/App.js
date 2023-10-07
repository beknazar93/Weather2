import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  let KEY = "35731cd3a60f81dc930c8734962dcdd1";
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeather = (cityName) => {
    axios(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`
    )
      .then(({ data }) => setWeather(data))
      .catch((error) => alert("не правельно ввели город"));

    setCity("");
  };

  return (
    <div className="App">
      <div className="weather">
        <input
          value={city}
          placeholder="Введите город"
          type="text"
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <button type="button" onClick={getWeather}>
          Узнать о погоде
        </button>

        <div>
          {/* {JSON.stringify(weather)} */}
          {JSON.stringify(weather) === "{}" ? (
            <h1>здесь будет ваша погода</h1>
          ) : (
            <table className="table" border="1">
              <tr>
                <td>город</td>
                <td>{weather.name}</td>
              </tr>
              <tr>
                <td>Страна</td>
                <td>{weather.sys.country}</td>
              </tr>
              <tr>
                <td>Температура</td>
                <td>{(weather.main.temp - 273.15).toFixed(1)}°C</td>
              </tr>
              <tr className="temp">
                <td>Описание</td>
                <td className="sky">
                  {weather.weather[0].main}{" "}
                  <img
                    src={` https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                    alt=""
                  />
                </td>
              </tr>
              <tr>
                <td>Ветер</td>
                <td>{weather.wind.speed} м/с</td>
              </tr>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import axios from "axios";
import Icon from "./Icon";
import { Hearts } from "react-loader-spinner";

function Weather(props) {
  if (props.temperature !== null) {
    return (
      <div>
        <p className="location">
          <b>
            In {props.location},{props.country} now:
          </b>
        </p>
        <ul>
          <li>Temperature: {Math.round(props.temperature)}°C</li>
          <li>Humidity: {props.humidityli}%</li>
          <li>Description: {props.descriptionli}</li>
          <li>Wind: {props.windli}km/h</li>
        </ul>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Please enter a city name!</h2>
        <div className="waiting">
          <Hearts
            height="100"
            width="100"
            color="#bacbeb"
            ariaLabel="hearts-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    );
  }
}
export default function Search() {
  let [city, setCity] = useState("");
  let [location, setLocation] = useState("");
  let [country, setCountry] = useState("");
  let [temper, setTemper] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [descrip, setDescrip] = useState(null);
  let [wind, setWind] = useState(null);
  let [icon, setIcon] = useState(null);
  let [triggerQuery, setTriggerQuery] = useState(null);
  React.useEffect(() => {
    function showTemp(response) {
      setCity(response.data.name);
      setLocation(response.data.name);
      setCountry(response.data.sys.country);
      setTemper(response.data.main.temp);
      setHumidity(response.data.main.humidity);
      setDescrip(response.data.weather[0].description);
      setWind(response.data.wind.speed);
      setIcon(response.data.weather[0].icon);
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4eba877dd9ec83758a66d7b35703d7cf&units=metric`;
    if (city !== "") {
      axios.get(url).then(showTemp);
    }
  }, [triggerQuery]);

  function citySearch(event) {
    event.preventDefault();
    setTriggerQuery({});
  }

  function userInput(event) {
    setCity(event.target.value);
  }

  return (
    <div className="searchEngine">
      <form onSubmit={citySearch}>
        <input type="search" onChange={userInput} />
        <input type="submit" value="Search" />
      </form>

      <Weather
        temperature={temper}
        humidityli={humidity}
        descriptionli={descrip}
        windli={wind}
        location={location}
        country={country}
      />
      <Icon iconif={icon} />
    </div>
  );
}

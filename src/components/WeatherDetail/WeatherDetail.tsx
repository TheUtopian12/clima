import { formatTemp } from "../../helpers";
import { Weather } from "../../hooks/useWeather";
import styles from "./WeatherDetail.module.css";
interface Props {
  weather: Weather;
}
export default function WeatherDetail({ weather }: Props) {
  return (
    <div className={styles.container}>
      <h2>Clima de: {weather.name}</h2>

      <p className={styles.current}>{formatTemp(weather.main.temp)} &deg;C </p>
      <div className={styles.temperatures}>
        <p>
          Min: <span>{formatTemp(weather.main.temp_min)}</span>
        </p>
        <p>
          Max: <span>{formatTemp(weather.main.temp_max)}</span>
        </p>
      </div>
    </div>
  );
}

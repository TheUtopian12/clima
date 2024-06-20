import styles from "./App.module.css";
import Alert from "./components/Alert/Alert";
import Form from "./components/Form/Form";
import Spiner from "./components/Spiner/Spiner";
import WeatherDetail from "./components/WeatherDetail/WeatherDetail";
import useWeather from "./hooks/useWeather";
function App() {
  const {
    fetchWeather,
    weather,
    hasWeatherData,
    loading,
    notFound,
  } = useWeather();
  return (
    <>
      <h1 className={styles.title}>Hola mundo</h1>

      <div className={styles.container}>
        <Form fetchWeather={fetchWeather} />

        {loading && <Spiner />}
        {hasWeatherData && <WeatherDetail weather={weather} />}
        {notFound && <Alert>No se encontro la ciudad</Alert>}
      </div>
    </>
  );
}

export default App;

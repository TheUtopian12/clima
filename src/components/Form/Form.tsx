import { ChangeEvent, useState, FormEvent } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import type { SearchType } from "../../types";
import Alert from "../Alert/Alert";

interface Props {
  fetchWeather: (search: SearchType) => Promise<void>;
}

const Form = ({ fetchWeather }: Props) => {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const [alert, setAlert] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(search).includes("")) {
      setAlert("Todos los campos son obligatorios");
      return;
    }
    fetchWeather(search);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad</label>
        <input
          type="text"
          id="city"
          placeholder="Ciudad"
          value={search.city}
          name="city"
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Pais</label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">-- Seleccione un pais--</option>
          {countries.map((country) => (
            <option
              style={{ color: "black" }}
              value={country.code}
              key={country.code}
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>
      <input className={styles.submit} type="submit" value="Consultar Clima" />
    </form>
  );
};

export default Form;

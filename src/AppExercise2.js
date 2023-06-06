import { useState, useEffect } from "react";
import countriesService from "./services/countries";
function AppExercise2() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    countriesService.getAll().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(search);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.official.toLowerCase().includes(search.toLowerCase())
      )
    );
    console.log(filteredCountries);
  };

  console.log(countries);

  return (
    <div>
      <p>Find country:</p>
      <input value={search} onChange={handleSearch} />
      <div>
        {filteredCountries.length > 10 ? (
          <p>Too many matches, specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          <div>
            <h1>{filteredCountries[0].name.common}</h1>
            <p>Capital: {filteredCountries[0].capital}</p>
            <p>Area: {filteredCountries[0].area}</p>
            <h2>Languages</h2>

            <img
              src={filteredCountries[0].flags.png}
              alt="flag"
              width="100"
              height="100"
            />
          </div>
        ) : (
          <ul>
            {filteredCountries.map((country) => (
              <li key={country.name.common}>
                {country.name.common} / {country.name.official}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
export default AppExercise2;

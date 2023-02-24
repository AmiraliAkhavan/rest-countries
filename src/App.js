import Header from "./Header";
import "./App.css";
import { useState, useRef, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import CountryPage from "./CountryPage";
import Country from "./Country";
import { Route, Routes } from "react-router-dom";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const showDetails = (ele) => {
    navigate(`/${ele}`);
  };

  const navigate = useNavigate();
  const searchCountries = () => {
    const searchValue = contriesInput.current.value;
    if (searchValue.trim()) {
      const searchFetch = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/name/${searchValue}`
        );
        const data = await response.json();
        setCountries(data);
      };
      try {
        searchFetch();
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchData();
    }
  };

  const swtichDark = () => {
    setDarkMode((prevState) => !prevState);
  };

  const contriesInput = useRef();
  const regionRef = useRef();

  const fetchData = async () => {
    const response = await fetch("https://restcountries.com/v2/all");
    const data = await response.json();
    setCountries(data);
  };

  const selectRegion = () => {
    const selectedValue = regionRef.current.value;
    if (selectedValue.trim()) {
      const selectedFetch = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/region/${selectedValue}`
        );
        const data = await response.json();
        if (selectedValue === "Filter by Region") {
          try {
            fetchData();
          } catch (error) {
            console.log(error);
          }
          return;
        }
        setCountries(data);
      };
      try {
        selectedFetch();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const noValue = countries.status;
  return (
    <div className={`App ${darkMode ? "darkMode" : ""}`}>
      <Header onClick={swtichDark} darkMode={darkMode} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="body">
              <div className="input">
                <div className={`search ${darkMode ? "darkMode" : ""}`}>
                  <SearchIcon />
                  <input
                    type="text"
                    placeholder="Search for a country..."
                    ref={contriesInput}
                    onChange={searchCountries}
                  />
                </div>
                <div
                  className={`region-selector ${darkMode ? "darkMode" : ""}`}
                >
                  <select ref={regionRef} onChange={selectRegion}>
                    <option value="Filter by Region">Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                  </select>
                </div>
              </div>
              <div className="countries">
                {!noValue ? (
                  countries?.map((country) => (
                    <Country
                      darkMode={darkMode}
                      name={country.name}
                      key={country.numericCode}
                      showDetails={showDetails}
                      code={country.alpha3Code}
                      capital={country.capital}
                      population={country.population}
                      region={country.region}
                      flag={country.flag}
                    />
                  ))
                ) : (
                  <p>No matches found!</p>
                )}
              </div>
            </div>
          }
        />
        <Route
          path="/:countryCode"
          element={
            <CountryPage
              darkMode={darkMode}
              countries={countries}
              refetch={fetchData}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

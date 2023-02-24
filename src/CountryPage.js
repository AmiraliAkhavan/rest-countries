import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const CountryPage = ({ darkMode, refetch, countries }) => {
  const params = useParams();
  const navigate = useNavigate();

  const back = () => {
    navigate("/");
  };

  let nativeName;
  let name;
  let currencies = [];
  let region;
  let population;
  let subRegion;
  let capital;
  let topLevelDomain;
  let flag;
  let languages = [];
  let borders = [];

  countries.forEach((country) => {
    if (country.alpha3Code === params.countryCode) {
      nativeName = country.nativeName;
      country.currencies?.forEach((currency) => {
        currencies.push(currency.name);
      });

      country.languages?.forEach((language) => {
        languages.push(language.name);
      });
      country.borders?.forEach((border) => {
        borders.push(border);
      });

      flag = country.flag;
      name = country.name;
      population = country.population;
      region = country.region;
      subRegion = country.subRegion;
      capital = country.capital;
      topLevelDomain = country.topLevelDomain;
    }
  });

  return (
    <div className="country-page">
      <button
        className={`back-btn ${darkMode ? "darkMode" : ""}`}
        onClick={back}
      >
        <ArrowBackIosIcon />
        <p>back</p>
      </button>
      <div className="country-detail">
        <div className="img">
          <img src={flag} alt="" />
        </div>
        <div className="country-info">
          <h2>{name}</h2>
          <div className="info-container">
            <div className="leftInfo">
              <p>
                Native Name:{""}
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {nativeName}
                </span>
              </p>
              <p>
                Population:{""}
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {population}
                </span>
              </p>
              <p>
                Region:{""}
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {region}
                </span>
              </p>
              <p>
                Sub Region:{""}
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {subRegion}
                </span>
              </p>
              <p>
                Capital:{""}
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {capital}
                </span>
              </p>
            </div>
            <div className="rightInfo">
              <p>
                Top Level Domain:{""}
                <span className={`value ${darkMode ? "darkMode" : ""}`}>
                  {topLevelDomain}
                </span>
              </p>{" "}
              <p>
                Currencies:
                {currencies.map((currency) => {
                  if (currencies.indexOf(currency) !== currencies.length - 1) {
                    return (
                      <span
                        key={currency}
                        className={`value ${darkMode ? "darkMode" : ""}`}
                      >
                        {""}
                        {currency}
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={currency}
                        className={`value ${darkMode ? "darkMode" : ""}`}
                      >
                        {""}
                        {currency}
                      </span>
                    );
                  }
                })}
              </p>
              <p>
                Languages:
                {languages.map((language) => {
                  if (languages.indexOf(language) !== languages.length - 1) {
                    return (
                      <span
                        key={language}
                        className={`value ${darkMode ? "darkMode" : ""}`}
                      >
                        {""}
                        {language},
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={language}
                        className={`value ${darkMode ? "darkMode" : ""}`}
                      >
                        {""}
                        {language}
                      </span>
                    );
                  }
                })}
              </p>
            </div>
          </div>
          Border Countries:
          {borders.length ? (
            borders.map((border) => (
              <div
                key={border}
                className={`borders ${darkMode ? "darkMode" : ""}`}
                onClick={() => {
                  refetch();
                  navigate(`/${border}`);
                }}
              >
                <p>{border}</p>
              </div>
            ))
          ) : (
            <div className={`value ${darkMode ? "darkMode" : ""}`}>
              <p>No borders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryPage;

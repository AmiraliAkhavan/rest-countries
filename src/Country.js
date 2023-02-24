const Country = ({
  darkMode,
  name,
  capital,
  flag,
  region,
  population,
  showDetails,
  code,
}) => {
  const showDetailsHandle = () => {
    showDetails(code);
  };
  return (
    <div
      className={`country ${darkMode ? "darkMode" : ""}`}
      onClick={showDetailsHandle}
    >
      <div className="flag">
        <img src={flag} alt="" />
      </div>

      <div className="details">
        <h3 className="name">{name}</h3>
        <p>
          Population: {""}
          <span className={`value ${darkMode ? "darkMode" : ""}`}>
            {population}
          </span>
        </p>
        <p>
          Region: {""}
          <span className={`value ${darkMode ? "darkMode" : ""}`}>
            {region}
          </span>
        </p>
        <p>
          Capital: {""}
          <span className={`value ${darkMode ? "darkMode" : ""}`}>
            {capital}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Country;

import ModeNightIcon from "@mui/icons-material/ModeNight";
function Header({ darkMode, onClick }) {
  return (
    <div className={`header ${darkMode ? "darkMode" : ""}`}>
      <div className="header_container">
        <h2 className="logo">Where In The World?</h2>
        <div className="switch" onClick={onClick}>
          <ModeNightIcon />
          <h3>Dark Mode</h3>
        </div>
      </div>
    </div>
  );
}
export default Header;

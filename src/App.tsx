import viteLogo from "/vite.svg";
import "./App.css";
import { NavLink } from "react-router";

function App() {
  return (
    <div className="flex select-none flex-col items-center gap-10 text-2xl">
      <img src={viteLogo} className="logo" alt="Vite logo" />

      <NavLink to="/screen/page-a">/screen/page-a</NavLink>

      <div className="flex flex-col">
        <NavLink to="/screen/page-b">/screen/page-b</NavLink>
        <p className="text-lg">(with CGU)</p>
      </div>

      <div className="flex flex-col">
        <NavLink to="/screen/bad-route">/screen/bad-route</NavLink>
        <p className="text-lg">(no intents)</p>
      </div>
    </div>
  );
}

export default App;

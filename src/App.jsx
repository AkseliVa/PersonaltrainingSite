import './App.css';

import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/Customerlist"}>Customerlist</Link>
        <Link to={"/Traininglist"}>Traininglist</Link>
        <Link to={"/Calendar"}>Calendar</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App

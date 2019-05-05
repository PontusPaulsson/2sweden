import React from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar";
import {SearchTrip} from "./Components/SearchTrip";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <SearchTrip/>
    </div>
  );
}

export default App;

import React, { Component } from "react";
import "./App.css";
import { Navbar } from "./Components/Navbar";
import { SearchTrip } from "./Components/SearchTrip";
import { SearchResult } from "./Components/SearchResult";

const apiKey = process.env.REACT_APP_API_KEY;
const base = `http://free.rome2rio.com/api/1.4/json/`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showResult: false
    };
  }

  //TODO - Gör en sökning mot rome2rio - uppdatera state i denna component och skicka med det till <SearchTrip/> för att rendera ut det i HTML.
  doSearch = (from, to, startDate, endDate) => {
    fetch(`${base}Search?key=${apiKey}&oName=${from}&dName=${to}`)
      .then(response => response.json())
      .then(data => console.log({ data }));

    console.log(from, to, startDate, endDate);
    this.setState({ showResult: true });
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        {this.state.showResult ? (
          <SearchResult />
        ) : (
          <SearchTrip doSearch={this.doSearch} />
        )}
      </div>
    );
  }
}

export default App;

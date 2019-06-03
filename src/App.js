import React, { Component } from "react";
import "./Css/App.css";
import "./Css/SearchTrip.css";
import "./Css/SearchResult.css";
import "./Css/MediaQueries.css";
import { Title } from "./Components/Title";
import Navbar from "./Components/Navbar";
import { Inspiration } from "./Components/Inspiration";
import SearchTrip from "./Components/SearchTrip";
import SearchResult from "./Components/SearchResult";
import OlympicSchedule from './Components/OlympicSchedule'

const apiKey = process.env.REACT_APP_API_KEY;
const base = `http://free.rome2rio.com/api/1.4/json/`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      vehicles: [],
      places: [],
      tableData: [],
      showResult: false,
      currencyCode: "",
      showSchedule: false
    };
  }

  getLocalCurrencyCode = () => {
    fetch(`http://www.geoplugin.net/json.gp`)
      .then(response => response.json())
      .then(data => {
        this.setState({ currencyCode: data.geoplugin_currencyCode });
      });
  };

  showSchedule = () => {
    this.setState({ showSchedule: true })
  }

  doSearch = (from, to) => {
    if (from) {
      fetch(
        `${base}Search?key=${apiKey}&oName=${from}&dName=${to}&currencyCode=${
        this.state.currencyCode
        }`
      )
        .then(response => response.json())
        .then(data => {
          this.setState({
            routes: data.routes,
            vehicles: data.vehicles,
            places: data.places,
            showResult: true
          });
          this.generateTableData(this.state.routes);
        })
        .catch(error => {
          console.log(error);
          this.setState({ showResult: false });
        });
    }
  };

  componentWillMount() {
    this.getLocalCurrencyCode();
  }

  timeConvert = num => {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return hours + "h " + minutes + "m";
  };

  generateTableData = routes => {
    let newData = [];
    routes.map(route => {
      let newObject = {
        transport: route.name,
        time: this.timeConvert(route.totalDuration),
        price: route.indicativePrices[0].price,
        transfers: route.segments.length - 1
      };
      return newData.push(newObject);
    });
    this.setState({ tableData: newData });
  };

  render() {
    return (
      <div className="App">
        <Title />
        <Navbar showSchedule={this.showSchedule} />
        {this.state.showResult ? (
          <SearchTrip doSearch={this.doSearch} />
        ) : this.state.showSchedule ? (
          <OlympicSchedule />
        ) : <Inspiration />}
        {this.state.showResult ? (
          <SearchResult
            routes={this.state.routes}
            vehicles={this.state.vehicles}
            places={this.state.places}
            tableData={this.state.tableData}
          />
        ) : this.state.showSchedule ? null :(
            <SearchTrip doSearch={this.doSearch} />
          )}
      </div>
    );
  }
}

export default App;

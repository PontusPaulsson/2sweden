import React, { Component } from "react";
import "./Css/App.css";
import "./Css/Schedule.css"
import "./Css/SearchTrip.css";
import "./Css/SearchResult.css";
import "./Css/MediaQueries.css";
import "./Css/Toolbar.css";
import { Title } from "./Components/Title";
import Navbar from "./Components/Navbar";
import { Inspiration } from "./Components/Inspiration";
import { Bamse } from "./Components/Bamse";
import SearchTrip from "./Components/SearchTrip";
import SearchResult from "./Components/SearchResult";
import OlympicSchedule from './Components/OlympicSchedule'
import Toolbar from "./Components/Toolbar";
import Sidebar from "./Components/Sidebar";
import Backdrop from "./Components/Backdrop";

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
      showSchedule: false,
      sidebarOpen: false
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

      // när vi klickar på search-knappen stängs sidebaren
      this.setState({ sidebarOpen: false });
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

  // denna funktion öppnar sidebaren när man klickar på menu-knappen
  sidebarClickHandler = () => {
    this.setState({ sidebarOpen: true });
  };

  // denna funktion stänger sidebaren när man klickar på backdropen
  backdropClickHandler = () => {
    this.setState({ sidebarOpen: false });
  };

  render() {
    // detta rendrar backdropen när sidebaren är öppen (true)
    let backdrop;
    if (this.state.sidebarOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div className="App">


        {this.state.showResult ? (
          <React.Fragment>
            <Title />
            <div className="mobile-sidebar-open">
              <Navbar showSchedule={this.showSchedule} />
              <SearchTrip doSearch={this.doSearch} />
            </div>
            <Toolbar sidebarClickHandler={this.sidebarClickHandler} />
            <Sidebar
              sidebarOpen={this.state.sidebarOpen}
              doSearch={this.doSearch}
            />
            {backdrop}
          </React.Fragment>
        ) : this.state.showSchedule ? (
            <React.Fragment>
              <Title />
              <Navbar />
              <OlympicSchedule />
            </React.Fragment>

        ) : (
              <React.Fragment>
                <Title />
                <Navbar showSchedule={this.showSchedule}  />
                <Inspiration />
              </React.Fragment>)}
        {this.state.showResult ? (
          <SearchResult
            routes={this.state.routes}
            vehicles={this.state.vehicles}
            places={this.state.places}
            tableData={this.state.tableData}
          />
        ) : this.state.showSchedule ? null : (
          <SearchTrip doSearch={this.doSearch} />
        )}
        {this.state.showResult ? null : <Bamse />}
      </div>
    );
  }
}

export default App;

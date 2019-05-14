import React, {Component} from "react";
import "./App.css";
import {Navbar} from "./Components/Navbar";
import SearchTrip from "./Components/SearchTrip";
import SearchResult from "./Components/SearchResult";

const apiKey = process.env.REACT_APP_API_KEY;
const base = `http://free.rome2rio.com/api/1.4/json/`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            routes: [],
            vehicles: [],
            places: [],
            showResult: false,
            currencyCode: ''
        };
    }

    getLocalCurrencyCode = () => {
        fetch(`http://www.geoplugin.net/json.gp`)
            .then(response => response.json())
            .then(data => {
                this.setState({currencyCode: data.geoplugin_currencyCode});
            });
    };

    doSearch = (from, to, startDate, endDate) => {
        if (from) {
            fetch(`${base}Search?key=${apiKey}&oName=${from}&dName=${to}&currencyCode=${this.state.currencyCode}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        routes: data.routes,
                        vehicles: data.vehicles,
                        places: data.places,
                        showResult: true
                    });
                })
                .catch(error => {
                    console.log(error);
                    this.setState({showResult: false});
                });
        }
    };

    componentWillMount() {
        this.getLocalCurrencyCode();
    }

    render() {
        return (
            <div className="App">
                <Navbar/>
                {this.state.showResult ? (
                    <SearchResult routes={this.state.routes} vehicles={this.state.vehicles} places={this.state.places}/>
                ) : (
                    <SearchTrip doSearch={this.doSearch}/>
                )}
            </div>
        );
    }
}

export default App;

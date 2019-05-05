import React, {Component} from 'react';
import './App.css';
import {Navbar} from "./Components/Navbar";
import {SearchTrip} from "./Components/SearchTrip";
import {SearchResult} from "./Components/SearchResult";

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            showResult: false
        };
    }


    //TODO - Gör en sökning mot rome2rio - uppdatera state i denna component och skicka med det till <SearchTrip/> för att rendera ut det i HTML.
    doSearch = (from, to, startDate, endDate) => {
        console.log(from, to, startDate, endDate);
        this.setState({showResult: true});

    }

    render(){
        return (
            <div className="App">
                <Navbar/>
                {this.state.showResult ? <SearchResult/> : <SearchTrip doSearch={this.doSearch}/>}
            </div>
        );
    }
}

export default App;

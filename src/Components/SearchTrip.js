import React, { Component } from "react";

export default class SearchTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "",
      to: "Stockholm",
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
  }

  handleChange(date, type) {
    this.setState({
      [type]: date
    });
  }

  onChangeTo(event) {
    this.setState({ to: event.target.value });
  }

  onChangeFrom(event) {
    this.setState({ from: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.doSearch(this.state.from, this.state.to);
  }

  render() {
    const options = ["Stockholm", "Åre", "Falun"];
    const isEnabled = this.state.from.length > 0;
    return (
      <React.Fragment>
        <div
          className="search-trip-container"
          data-test="search-trip-container"
        >
          <form onSubmit={this.handleSubmit}>
            <div className="from-to-container">
              <input
                onChange={this.onChangeFrom}
                type="text"
                placeholder="From"
                className="input"
                value={this.state.from}
              />
              <select className="input" onChange={this.onChangeTo}>
                {options.map(option => (
                  <option key={option}> {option}</option>
                ))}
              </select>
              <button disabled={!isEnabled} className="search">
                Search
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

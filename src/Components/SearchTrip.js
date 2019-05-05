import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export class SearchTrip extends Component {
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

    onChangeTo(event){
        this.setState({to: event.target.value});
    }

    onChangeFrom(event){
        this.setState({from: event.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.doSearch(this.state.from, this.state.to, this.state.startDate, this.state.endDate);
    }

    render() {
        const options = ['Stockholm', 'Åre', 'Falun'];
        return (
            <div className="search-trip-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="from-to-container">
                        <input onChange={this.onChangeFrom} type="text" placeholder="From" className="from-input" value={this.state.from}/>
                        <select className="select-to" onChange={this.onChangeTo}>{options.map(option => <option>{option}</option>)}</select>
                    </div>
                    <div className="date-picker-container">
                        <div className="date-picker">
                            <label className="date-label">Departure date</label>
                            <DatePicker
                                className="date-picker-input"
                                selected={this.state.startDate}
                                onChange={(date) => {
                                    this.handleChange(date, "startDate")
                                }}
                            />
                        </div>
                        <div className="date-picker">
                            <label className="date-label">Going home date</label>
                            <DatePicker
                                className="date-picker-input"
                                selected={this.state.endDate}
                                onChange={(date) => {
                                    this.handleChange(date, "endDate")
                                }}
                            />
                        </div>
                    </div>
                    <a href="">See the olympic schedule</a>
                    <div className="search-button-container">
                        <button>Sök</button>
                    </div>
                </form>
            </div>
        )
    }
}
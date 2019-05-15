import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import MapContainer from "./MapContainer";

export default class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            segmentData: [],
            selected: null,
            segmentTableToggle: false,
            segmentTableLength: 0
        };
    }

    timeConvert = num => {
        let hours = Math.floor(num / 60);
        let minutes = num % 60;
        return hours + "h " + minutes + "m";
    };

    generateSegmentTableData = route => {
        let segments = [];
        route.segments.map(segment => {
            let newSegment = {
                transport: this.props.vehicles[segment.vehicle].name,
                from: this.props.places[segment.depPlace].shortName,
                to: this.props.places[segment.arrPlace].shortName,
                time: this.timeConvert(segment.transitDuration),
                path: segment.path
            };
            return segments.push(newSegment);
        });
        this.setState({
            segmentData: segments,
            segmentTableLength: segments.length
        });
    };

    render() {
        const onRowClick = (state, rowInfo) => {
            return {
                onClick: e => {
                    this.generateSegmentTableData(this.props.routes[rowInfo.index]);
                    this.setState({segmentTableToggle: true});
                }
            };
        };
        const resultColumns = [
            {
                Header: "Transport",
                accessor: "transport" // String-based value accessors!
            },
            {
                Header: "Time",
                accessor: "time"
                // Cell: props => <span className="number">{props.value}</span> // Custom cell components!
            },
            {
                accessor: "price", // Required because our accessor is not a string
                Header: "Price (SEK)"
            },
            {
                accessor: "transfers", // Required because our accessor is not a string
                Header: "Transfers"
            }
        ];

        const segmentColumns = [
            {
                Header: "Transport",
                accessor: "transport" // String-based value accessors!
            },
            {
                Header: "From",
                accessor: "from" // String-based value accessors!
            },
            {
                Header: "To",
                accessor: "to" // String-based value accessors!
            },
            {
                Header: "Time",
                accessor: "time" // String-based value accessors!
            }
        ];
        return (
            <div>
                <ReactTable
                    className="result-table"
                    data={this.props.tableData}
                    columns={resultColumns}
                    showPagination={false}
                    defaultPageSize={this.props.routes.length}
                    getTrProps={onRowClick}
                />
                {this.state.segmentTableToggle ? (
                    <ReactTable
                        className="result-table"
                        data={this.state.segmentData}
                        showPagination={false}
                        columns={segmentColumns}
                        pageSize={this.state.segmentTableLength}
                    />
                ) : null}
                {this.state.segmentTableToggle ? (
                    <MapContainer children={this.state.segmentData}/>
                ) : null}
            </div>
        );
    }
}  
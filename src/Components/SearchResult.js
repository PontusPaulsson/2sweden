import React, {Component} from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

//TODO Skicka in data till props och rendera ut detta i HTML.
export class SearchResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            segmentData: [],
            selected: null,
            segmentTableToggle: false,
        };
    }

    timeConvert = (num) => {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return hours + "h" + minutes + "m";
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
            newData.push(newObject);
        });
        this.setState({tableData: newData});
    };

    generateSegmentTableData = (route) => {
        let segments = [];
        route.segments.map(segment => {
            let newSegment = {
                transport: this.props.vehicles[segment.vehicle].name,
                from: this.props.places[segment.depPlace].shortName,
                to: this.props.places[segment.arrPlace].shortName,
                time: this.timeConvert(segment.transitDuration)
            };
           return segments.push(newSegment);
        });
        this.setState({segmentData: segments})
    };

    componentDidMount() {
        this.generateTableData(this.props.routes);
    };

    render() {
        const onRowClick = (state, rowInfo) => {
            return {
                onClick: e => {
                    this.generateSegmentTableData(this.props.routes[rowInfo.index]);
                    this.setState({segmentTableToggle: true})
                }
            }
        };

        const resultColumns = [
            {
                Header: "Färdmedel",
                accessor: "transport" // String-based value accessors!
            },
            {
                Header: "Tid",
                accessor: "time"
                // Cell: props => <span className="number">{props.value}</span> // Custom cell components!
            },
            {
                accessor: "price", // Required because our accessor is not a string
                Header: "Pris (SEK)"
            },
            {
                accessor: "transfers", // Required because our accessor is not a string
                Header: "Byten"
            }
        ]

        const segmentColumns = [
            {
                Header: "Färdmedel",
                accessor: "transport" // String-based value accessors!
            },
            {
                Header: "Från",
                accessor: "from" // String-based value accessors!
            },
            {
                Header: "Till",
                accessor: "to" // String-based value accessors!
            },
            {
                Header: "Tid",
                accessor: "time" // String-based value accessors!
            }];
        return (
            <div>
                <ReactTable
                    className="result-table"
                    data={this.state.tableData}
                    columns={resultColumns}
                    showPagination={false}
                    defaultPageSize={this.props.routes.length}
                    getTrProps={onRowClick}
                />
                {this.state.segmentTableToggle ? (
                    <ReactTable
                        className="result-table"
                        data={this.state.segmentData}
                        columns={segmentColumns}
                    />
                ) : (
                    null
                )}

            </div>
        );
    }
}

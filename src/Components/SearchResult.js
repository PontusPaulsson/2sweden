import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import MapContainer from "./MapContainer";
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

export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      segmentData: [],
      selected: -1,
      segmentTableToggle: false,
      segmentTableLength: 0,
      selectionChanged: false,
      rowEdit: false,
      selectedRowIndex: 0,
      test: true,
      rowClicked: false,
      expanded: {}
    };
  }

  timeConvert = num => {
    let hours = Math.floor(num / 60);
    let minutes = num % 60;
    return hours + "h " + minutes + "m";
  };

  generateSegmentTableData = route => {
    this.setState({ rowClicked: false });
    let segments = [];
    route.segments.map(segment => {
      let newSegment = {
        transport: this.props.vehicles[segment.vehicle].name,
        from: this.props.places[segment.depPlace].shortName,
        to: this.props.places[segment.arrPlace].shortName,
        time: this.timeConvert(segment.transitDuration),
        path: segment.path,
        strokeColor: this.getStrokeColor(
          this.props.vehicles[segment.vehicle].name
        ),
        depPlace: segment.depPlace,
        arrPlace: segment.arrPlace
      };
      return segments.push(newSegment);
    });
    this.setState({
      segmentData: segments,
      segmentTableLength: segments.length
    });
  };

  getStrokeColor = vehicle => {
    switch (vehicle) {
      case "Walk":
        return "#FAFAFA";
      case "Bus":
        return "#E47225";
      case "Plane":
        return "#04C9A6";
      case "Train":
        return "#734286";
      case "Car":
        return "#606060";
      default:
        return "#FFFFFF";
    }
  };

  componentWillReceiveProps() {
    this.generateSegmentTableData(this.props.routes[0]);
  }
  onRowClick = (state, rowInfo) => {
    if (rowInfo && rowInfo.row) {
      console.log(this.state);
      console.log("<<<<<<<<<<<<<<<<<<<<CONSOLELOG>>>>>>>>>>>>>>>>>>>>>>>");
      console.log(rowInfo.index);
      if (this.state.rowClicked === false) {
        switch (rowInfo.index) {
          case 0:
            return {
              style: {
                background: "#ffcc00",
                color: "#006699"
              }
            };
          default:
        }
      }
      if (
        rowInfo.index === this.state.rowEdit &&
        this.state.rowClicked === false
      ) {
        return {
          onClick: e => {
            this.generateSegmentTableData(this.props.routes[rowInfo.index]);
            this.setState({
              segmentTableToggle: true,
              rowClicked: true,
              rowEdit: rowInfo.index,
              selectedRowIndex: rowInfo.original,
              selectionChanged: this.state.selectionChanged ? false : true
            });
          },
          style: {
            background: "#006699",
            color: "#ffcc00"
          }
        };
      }
      return {
        onClick: e => {
          this.generateSegmentTableData(this.props.routes[rowInfo.index]);
          this.setState({
            segmentTableToggle: true,
            rowClicked: true,
            rowEdit: rowInfo.index,
            selectedRowIndex: rowInfo.original,
            selectionChanged: this.state.selectionChanged ? false : true
          });
        },
        style: {
          background:
            rowInfo.index === this.state.rowEdit ? "#ffcc00" : "#006699",
          color: rowInfo.index === this.state.rowEdit ? "#006699" : "#ffcc00"
        }
      };
    } else {
      return {};
    }
  };
  handleRowExpanded(rowsState, index) {
    this.setState({
      expanded: {
        [index[0]]: !this.state.expanded[index[0]]
      }
    });
  }
  render() {
    return (
      <div className="result-container">
        <ReactTable
          className="result-table"
          data={this.props.tableData}
          columns={resultColumns}
          showPagination={false}
          defaultPageSize={this.props.routes.length}
          getTrProps={this.onRowClick}
          expanded={this.state.expanded}
          onExpandedChange={(newExpanded, index, event) =>
            this.handleRowExpanded(newExpanded, index, event)
          }
          SubComponent={row => {
            return (
              <ReactTable
                className="result-subtable"
                data={this.state.segmentData}
                showPagination={false}
                columns={segmentColumns}
                pageSize={this.state.segmentTableLength}
                sortable={false}
              />
            );
          }}
        />
        <div className="map">
          <MapContainer
            segmentData={this.state.segmentData}
            places={this.props.places}
          />
        </div>
      </div>
    );
  }
}

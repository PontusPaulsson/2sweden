import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

//TODO Skicka in data till props och rendera ut detta i HTML.
export class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
  }

  generateTableData = routes => {
    let newData = [];
    routes.map(route => {
      let newObject = {
        transport: route.name,
        time: route.totalDuration,
        price: route.indicativePrices[0].price
      };
      newData.push(newObject);
    });
    this.setState({ tableData: newData });
  };

  componentDidMount() {
    this.generateTableData(this.props.routes);
  }

  render() {
    const data = [
      {
        transport: "",
        time: "",
        price: ""
      }
    ];

    const columns = [
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
        Header: "Pris"
      }
    ];

    return (
      <ReactTable
        className="result-table"
        data={this.state.tableData}
        columns={columns}
      />
    );
  }
}

import React, { useState, useEffect, useReducer } from "react";
import { appReducer, tableReducer } from "./appReducers";
import { ExampleComponent, Column, isValid } from "c5-react-utils";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "c5-react-utils/dist/index.css";

const data = [
  {
    first: "Mike",
    last: "Bedingfield",
    email: "mbedingfield@dcrpos.com",
    job: "Senior Software Developer",
  },
  {
    first: "Tommy",
    last: "Adair",
    email: "tadair@dcrpos.com",
    job: "Senior Project Manager and Business Analyst",
  },
];

const initialState = {
  data,
};

const initialTableState = {
  sortFirstAsc: false,
  sortLastAsc: false,
  sortEmailAsc: false,
  sortJobAsc: false,
  sortField: null,
  sortDataType: "string",
  filterFirst: false,
  filterLast: false,
  filterEmail: false,
  filterJob: false,
  filterValue: "",
};

const App = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [testInput, setTestInput] = useState(null);
  const [result, setResult] = useState(false);
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [tableState, tableDispatch] = useReducer(
    tableReducer,
    initialTableState
  );

  useEffect(() => {
    if (tableState.sortField !== null) {
      setFilteredData([...data].sort(compare));
    }
    // eslint-disable-next-line
  }, [tableState]);

  useEffect(() => {
    filterRecords();
    // eslint-disable-next-line
  }, [tableState.filterValue]);

  const getSortField = () => {
    switch (tableState.sortField) {
      case "first":
        return tableState.sortFirstAsc;
      case "last":
        return tableState.sortLastAsc;
      case "email":
        return tableState.sortEmailAsc;
      case "job":
        return tableState.sortJobAsc;
      default:
        return tableState.sortFirstAsc;
    }
  };

  const compare = (a, b) => {
    let fieldA = a[tableState.sortField].toUpperCase();
    let fieldB = b[tableState.sortField].toUpperCase();

    if (state.sortDataType === "number") {
      fieldA = parseFloat(a[tableState.sortField]);
      fieldB = parseFloat(b[tableState.sortField]);
    }

    let comparison = 0;
    if (fieldA > fieldB) {
      comparison = 1;
    } else if (fieldA < fieldB) {
      comparison = -1;
    }

    if (getSortField()) {
      return comparison * -1;
    } else {
      return comparison;
    }
  };

  const filterRecords = () => {
    if (tableState.filterValue.length === 0) {
      setFilteredData(data);
      return;
    }
    const newArray = [...data].filter((r) =>
      r[tableState.filterField]
        .toUpperCase()
        .includes(tableState.filterValue.toUpperCase())
    );
    setFilteredData(newArray);
  };

  const testIsValid = () => {
    setResult(isValid(testInput));
  };

  return (
    <React.Fragment>
      <ExampleComponent text="Random React Toys that I enjoy" />
      <div>
        <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
          <h3>Sortable/Filterable Column</h3>
        </div>
        <table
          className="table table-striped"
          style={{ width: "90%", margin: "0 auto", color: "#fff" }}
        >
          <thead>
            <tr>
              <Column
                label={"First"}
                field={"sortFirstAsc"}
                state={tableState}
                dispatch={tableDispatch}
                sortable={true}
                filterable={true}
                filterField={"filterFirst"}
                sortField={"sortFirst"}
              />
              <Column
                label={"Last"}
                field={"sortLastAsc"}
                state={tableState}
                dispatch={tableDispatch}
                sortable={true}
                filterable={true}
                filterField={"filterLast"}
                sortField={"sortLast"}
              />
              <Column
                label={"Email"}
                field={"sortEmailAsc"}
                state={tableState}
                dispatch={tableDispatch}
                sortable={true}
                filterable={true}
                filterField={"filterEmail"}
                sortField={"sortEmail"}
              />
              <Column
                label={"Job"}
                field={"sortJobAsc"}
                state={tableState}
                dispatch={tableDispatch}
                sortable={true}
                filterable={true}
                filterField={"filterJob"}
                sortField={"sortJob"}
              />
            </tr>
          </thead>
          <tbody>
            {filteredData.map((record, index) => (
              <tr key={`tr-data-${index}`}>
                <td>{record.first}</td>
                <td>{record.last}</td>
                <td>{record.email}</td>
                <td>{record.job}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            width: "80%",
            margin: "0 auto",
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          <h3>Testing Functions</h3>
          <div className="row">
            <div class="col-sm-4">
              <input
                type="text"
                className="form-control"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              <button className="btn btn-outline-light" onClick={testIsValid}>
                Test isValid Function
              </button>
            </div>
            <div className="col-sm-4">{`Test result: ${result}`}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;

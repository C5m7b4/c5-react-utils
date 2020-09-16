# c5-react-utils

> My set of utilities for creating React Apps

[![NPM](https://img.shields.io/npm/v/c5-react-utils.svg)](https://www.npmjs.com/package/c5-react-utils) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save c5-react-utils
```

## Usage

```jsx
import React, { useState, useEffect, useReducer } from "react";
import { appReducer, tableReducer } from "./Reducers";
import { Column } from "c5-react-utils";
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

// obviously we would normally fetch this data and put it into state
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

const Table = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [tableState, tableDispatch] = useReducer(
    tableReducer,
    initialTableState
  );

  useEffect(() => {
    if (tableState.sortField !== null) {
      setFilteredData([...data].sort(compare));
    }
  }, [tableState]);

  useEffect(() => {
    filterRecords();
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

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Table;
```

## Reducers.js

```jsx
const appReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const tableReducer = (state, action) => {
  switch (action.type) {
    case "filterFirst":
      return {
        ...state,
        filterFirst: !state.filterFirst,
        filterField: "first",
      };
    case "sortFirst":
      return {
        ...state,
        sortFirstAsc: !state.sortFirstAsc,
        sortDataType: "string",
        sortField: "first",
      };
    case "filterLast":
      return {
        ...state,
        filterLast: !state.filterLast,
        filterField: "last",
      };
    case "sortLast":
      return {
        ...state,
        sortLastAsc: !state.sortLastAsc,
        sortField: "last",
        sortDataType: "string",
      };
    case "filterEmail":
      return {
        ...state,
        filterEmail: !state.filterEmail,
        filterField: "email",
      };
    case "sortEmail":
      return {
        ...state,
        sortEmailAsc: !state.sortEmailAsc,
        sortField: "email",
        sortDataType: "string",
      };
    case "filterJob":
      return {
        ...state,
        filterJob: !state.filterJob,
        filterField: "job",
      };
    case "sortJob":
      return {
        ...state,
        sortJobAsc: !state.sortJobAsc,
        sortField: "job",
        sortDataType: "string",
      };
    case "filterchange":
      return {
        ...state,
        filterValue: action.value,
      };
    default:
      return state;
  }
};

export { appReducer, tableReducer };
```

## Additional Information

We are going to be managing two sets of state. The first piece of state 'initialState' is there for the entire app. The 'initialTableState' is there just to manage the state of our table. We are using the useReducer hook to manage these two pieces of state. We have also used bootstrap for some additional styling.

## License

MIT © [C5m7b4](https://github.com/C5m7b4)

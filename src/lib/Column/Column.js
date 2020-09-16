import React from "react";
import PropTypes from "prop-types";

import styles from "./Column.css";

const Column = ({
  dispatch,
  state,
  label,
  filterField,
  sortField,
  sortable,
  filterable,
  field,
}) => {
  // determine if we have 1 or 2 or 3 columns needed for our style
  let columnStyle = {
    display: "grid",
    gridTemplateColumns: "75% 1fr 1fr",
  };
  if ((!sortable && filterable) || (!filterable && sortable)) {
    columnStyle = {
      display: "grid",
      gridTemplateColumns: "80% 1fr",
    };
  } else if (!sortable && !filterable) {
    columnStyle = {
      display: "grid",
      gridTemplateColumns: "1fr",
    };
  }

  return (
    <th>
      <div style={columnStyle}>
        <span>{label}</span>
        {filterable ? (
          <span
            className={styles.filterableIcon}
            onClick={() => dispatch({ type: filterField })}
          >
            <i className="fal fa-filter" />
          </span>
        ) : null}
        {sortable ? (
          <span
            className={styles.sortableIcon}
            onClick={() => dispatch({ type: sortField })}
          >
            {state[field] ? (
              <span className="sortableUp">
                <i className="fas fa-sort-up" />
              </span>
            ) : (
              <span className="sortableDown">
                <i className="fas fa-sort-down" />
              </span>
            )}
          </span>
        ) : null}
      </div>
      {state[filterField] ? (
        <div>
          <input
            type="text"
            value={state.filterValue}
            className="form-control"
            onChange={(e) =>
              dispatch({
                type: "filterchange",
                value: e.target.value,
              })
            }
          />
        </div>
      ) : null}
    </th>
  );
};

Column.propTypes = {
  dispatch: PropTypes.func,
  state: PropTypes.object,
  label: PropTypes.string,
  filterField: PropTypes.string,
  sortField: PropTypes.string,
  sortable: PropTypes.bool,
  filterable: PropTypes.bool,
  field: PropTypes.string,
};

export default Column;

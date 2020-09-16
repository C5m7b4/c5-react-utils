import React from "react";
import styles from "./styles.module.css";
import {
  isValid,
  formatDate,
  formatTime,
  addDays,
  encrypt,
  decrypt,
  truncateString,
  getDayOfWeek,
  formatMoney,
  pad,
} from "./lib/utils";
import Column from "./lib/Column/Column";
import ColumnStyles from "./lib/Column/Column.css";

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>;
};

export {
  isValid,
  formatDate,
  formatTime,
  addDays,
  encrypt,
  decrypt,
  truncateString,
  getDayOfWeek,
  formatMoney,
  pad,
  Column,
  ColumnStyles,
};

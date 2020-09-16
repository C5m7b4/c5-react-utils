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

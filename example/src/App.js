import React from "react";

import { ExampleComponent, getDayOfWeek } from "c5-react-utils";
import "c5-react-utils/dist/index.css";

const App = () => {
  debugger;
  const dow = getDayOfWeek(new Date("1/1/2020"));
  console.log(dow);
  return (
    <React.Fragment>
      <ExampleComponent text="Create React Library Example 😄" />
      <div>
        
      </div>
    </React.Fragment>
  );
};

export default App;

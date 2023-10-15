// App.js

import React from "react";
import HomePage from "./Pages/HomePage/HomePage";
import NestedGrid from "./Components/NestedGrid";
import DoughnutChart from "./Components/DoughnutChart";

function App() {
  return (
    <div className="wrapper">
      <NestedGrid></NestedGrid>
    </div>
  );
}

export default App;

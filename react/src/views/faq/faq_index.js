import { StrictMode } from "react";
import ReactDOM from "react-dom";

import FAQ from "./FAQ";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <FAQ />
  </StrictMode>,
  rootElement
);

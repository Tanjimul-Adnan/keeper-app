import React from "react";
import ReactDOM from "react-dom";
import Head from "./header.js";
import Foot from "./footer.js";
import Note from "./note.js";

ReactDOM.render(
  <div>
    <Head />
    {/* <Note /> */}
    <Foot />
  </div>,
  document.getElementById("root")
);

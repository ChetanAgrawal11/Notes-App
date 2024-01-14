import React from "react";
import { useContext } from "react";
import Notes from "./notes";

export const Home = (props) => {
  return (
    <div>
      <h2 className="my-3">Add notes :</h2>

      <Notes alertfun={props.alertfun} />
     
    </div>
  );
};

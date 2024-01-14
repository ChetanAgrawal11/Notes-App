import React from "react";
import { useContext } from "react";
import Notes from "./notes";

export const Home = () => {
  return (
    <div>
      <h2 className="my-3">Add notes :</h2>
      
      <h2 className="my-3">Your Notes :</h2>
      <Notes />
    </div>
  );
};

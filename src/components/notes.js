import React from "react";
import context from "../Context/notes/NoteContext";
import { useContext, useEffect } from "react";
import Newsitems from "./Newsitems";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";
function Notes(props) {
  let context_g = useContext(context);
  let history = useNavigate();
  let { notes, getNotes } = context_g;
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history("/Login");
    }
  }, []);

  return (
    <>
      {" "}
      <Addnote alertfun={props.alertfun} />
      <h2 className="my-3">Your Notes :</h2>
      <div className="row my-3">
        <div id="container">
          {notes.length === 0 && "There is no note to display "}
        </div>

        {notes.map((note) => {
          return <Newsitems key={note._id} note={note} />;
        })}
      </div>
    </>
  );
}

export default Notes;

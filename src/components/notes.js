import React from "react";
import context from "../Context/notes/NoteContext";
import { useContext, useEffect } from "react";
import Newsitems from "./Newsitems";
import Addnote from "./Addnote";
function Notes() {
  let context_g = useContext(context);

  let { notes, getNotes } = context_g;
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      {" "}
      <Addnote />
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

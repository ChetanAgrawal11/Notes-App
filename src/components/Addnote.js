import React from "react";
import context from "../Context/notes/NoteContext";
import { useContext, useState } from "react";
const Addnote = (props) => {
  let context_g = useContext(context);
  let { addNote } = context_g;
  const [note, setnote] = useState({ title: " ", description: " ", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.alertfun("Note added successfully ", "primary");
    setnote({ title: " ", description: "", tag: "" });
  };
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            value={note.description}
            className="form-control"
            id="description"
            name="description"
            minLength={5}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag
          </label>
          <input
            type="text"
            value={note.tag}
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          disabled={note.title.length < 5 && note.description.length < 5}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Addnote;

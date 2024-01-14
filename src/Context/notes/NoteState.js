import context from "./NoteContext";
import { useEffect, useState } from "react";
const NoteState = (props) => {
  let initial_notes = [];
  const [notes, setnotes] = useState(initial_notes);
  const getNotes = async () => {
    // API CALLS
    const response = await fetch(`http://localhost:5000/api/notes/fetchNotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "auth-token": localStorage.getItem("token"),
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5OTk0ZTc2NmQzODU1YTEyN2NkYTIzIn0sImlhdCI6MTcwNDU2NDUwMn0.JKY4alq8kXttE7rroT584q7sv0wRNfZMPiCegZmVQmk",
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
    setnotes(json.notes);
    // if (Array.isArray(json)) {
    //   setnotes(json);
    // } else {
    //   console.error("API response is not an array:", json);
    // }
  };

  const addNote = async (title, description, tag) => {
    // API CALLS
    const response = await fetch(
      `http://localhost:5000/api/notes/createNotes`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5OTk0ZTc2NmQzODU1YTEyN2NkYTIzIn0sImlhdCI6MTcwNDU2NDUwMn0.JKY4alq8kXttE7rroT584q7sv0wRNfZMPiCegZmVQmk",
        },
        body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      }
    );
    const json = await response.json(); // parses JSON response into native JavaScript objects

    setnotes(notes.concat(json));
  };
  const deleteNote = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/notes/deleteNotes/${id}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
          // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5OTk0ZTc2NmQzODU1YTEyN2NkYTIzIn0sImlhdCI6MTcwNDU2NDUwMn0.JKY4alq8kXttE7rroT584q7sv0wRNfZMPiCegZmVQmk",
        },
        // body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
      }
    );
    const index = notes.filter((note) => {
      return note._id !== id;
    });

    setnotes(index);
  };
  return (
    <context.Provider
      value={{ notes, setnotes, addNote, deleteNote, getNotes }}
    >
      {props.children}
    </context.Provider>
  );
};
export default NoteState;

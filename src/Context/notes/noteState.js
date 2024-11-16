import { useState } from "react";
import React from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3001";
  const notesInitial = ([]);

  const [notes, setNotes] = useState(notesInitial);

  // GET NOTE:
  const getNote = async () => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
  
    try {
      const response = await fetch(`${host}/api/note/fetchnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
  
      if (!response.ok) {
        console.error(`Failed to fetch notes. Status: ${response.status} - ${response.statusText}`);
        return;
      }
  
      const json = await response.json();
      console.log(json);
      setNotes(json); 
  
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };
  
  
  // const getNote = async () => {
  //   // API CALL
  //   const response = await fetch(`${host}/api/note/fetchnotes`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":
  //         localStorage.getItem('token')
  //     },
  //   });
  //   const json = await response.json();
  //   console.log(json);
  //   setNotes(json); // Update notes state with fetched notes
  // };
  const addNote = async (title, description, tag) => {
    try {
        // API CALL
        const response = await fetch(`${host}/api/note//addnotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token":
                    localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        if (!response.ok) {
            // If response is not OK, throw an error
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const note = await response.json(); // Use the response to get the new note
        setNotes(notes.concat(note)); // Add the new note to the state
        console.log("Note added successfully:", note); // Debug log

    } catch (error) {
        console.error("Failed to add note:", error); // Log the error
        alert("Failed to add note. Please try again."); // Show an error message to the user
    }
};

  // // ADD A NOTE:
  // const addNote = async (title, description, tag) => {
  //   // API CALL
  //   const response = await fetch(`${host}/api/note/addnotes`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhZmUzM2ZiZjRiZGEwZDgwMGI4YTA3In0sImlhdCI6MTcyMjgwMzAwN30.mvaX3Wdbh6KAeQKVwwkupFgkCXFY0tOIOHY7fOlX85U",
  //     },
  //     body: JSON.stringify({ title, description, tag }),
  //   });
  //   const note = await response.json(); // Use the response to get the new note
  //   setNotes(notes.concat(note)); // Add the new note to the state
  // };

  // DELETE A NOTE:
  const deleteNote = async (id) => {
     // API CALL
     const response = await fetch(`${host}/api/note/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    console.log("Deleting a Note with id " + id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
  };

  // EDIT A NOTE:
  const editNote = async ({ id, title, description, tag }) => {
    try {
        const response = await fetch(`${host}/api/note/updatenotes/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }),
        });

        // If response is not ok, log the error status and statusText
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${response.statusText} - ${errorText}`);
        }

        const json = await response.json();
        console.log("Note updated:", json);

        // Update the notes state with the edited note
        const newNotes = notes.map((note) =>
            note._id === id ? { ...note, title, description, tag } : note
        );
        setNotes(newNotes);
    } catch (error) {
        console.error("Failed to update note:", error.message);
        // Optionally, show an alert to the user or handle the error in a user-friendly way
    }
};


  // const editNote = async (id, title, description, tag) => {
  //   // API CALL
  //   const response = await fetch(`${host}/api/note/updatenotes/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token":
  //         localStorage.getItem('token'),
  //     },
  //     body: JSON.stringify({ title, description, tag }),
  //   });
  //   const json = await response.json();
  //   console.log(json);

  //   // Update the notes state with the edited note
  //   const newNotes = notes.map((note) =>
  //     note._id === id
  //       ? { ...note, title, description, tag }
  //       : note
  //   );
  //   setNotes(newNotes);
  // };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

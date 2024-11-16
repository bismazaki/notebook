import React, { useContext, useEffect, useRef } from 'react';
import noteContext from '../Context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import ModalEdit from './Modal';
import { useNavigate } from 'react-router-dom';

function Note() {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNote } = context;

  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNote();  // Fetch notes only if the user is authenticated
    } else {
      navigate("/login");  // Redirect to login if no token is found
    }
    // eslint-disable-next-line
  }, []);

  const updatenote = (note) => {
    ref.current.updatenote(note);
  };

  return (
    <>
      <Addnote />
      <ModalEdit ref={ref} />
      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className='container mx-2'>
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updatenote={updatenote} note={note} />;
        })}
      </div>
    </>
  );
}

export default Note;

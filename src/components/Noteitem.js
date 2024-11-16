import Card from 'react-bootstrap/Card';
import { CardSubtitle } from 'react-bootstrap';
import noteContext from '../Context/notes/noteContext';
import React, { useContext} from 'react';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note, updatenote} = props;
  return (
    <>
    <div className='col-md-3'>
   <Card>
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>
        {note.description}
        </Card.Text>
        <CardSubtitle>{note.tag}</CardSubtitle>
        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i> 
      </Card.Body>
    </Card>

    </div>
    </>
  )
}

export default Noteitem

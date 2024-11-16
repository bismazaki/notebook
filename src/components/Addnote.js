import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import noteContext from '../Context/notes/noteContext';
import React, { useContext, useState } from 'react';

function Addnote() {
    const context = useContext(noteContext);
    const { addNote } = context;
    
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleClick = (e) => {
        e.preventDefault(); // Prevent page refresh
        addNote(note.title, note.description, note.tag); // Pass the user input to addNote
        setNote({ title: "", description: "", tag: "" });
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title" // Added name attribute
                        value={note.title} // Bind value to state
                        onChange={onChange}
                        placeholder="Enter title"
                        minLength={5}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description" // Added name attribute
                        value={note.description} // Bind value to state
                        onChange={onChange}
                        placeholder="Enter Description"
                        minLength={5}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="tag">
                    <Form.Label>Tag</Form.Label>
                    <Form.Control
                        type="text"
                        name="tag" // Added name attribute
                        value={note.tag} // Bind value to state
                        onChange={onChange}
                        placeholder="Enter Tag"
                        minLength={3}
                        required
                    />
                </Form.Group>

                <Button disabled={note.title.length<5 || note.description.length<5 || note.tag.length<3} variant="primary" onClick={handleClick} type="submit">
                    Add Note
                </Button>
            </Form>
        </>
    );
}

export default Addnote;

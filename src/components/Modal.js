import React, { useState, useImperativeHandle, forwardRef , useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import noteContext from '../Context/notes/noteContext';

const ModalEdit = forwardRef((props, ref) => {
    const [show, setShow] = useState(false);
    const [note, setNote] = useState({id: "", title: "", description: "", tag: "" });

    const handleClose = () => setShow(false);
    const context = useContext(noteContext);
    const {editNote} = context;

    useImperativeHandle(ref, () => ({
        updatenote(updatedNote) {
            setNote({
                id: updatedNote._id, 
                title: updatedNote.title,
                description: updatedNote.description,
                tag: updatedNote.tag
            });
            setShow(true);
        }
    }));

    const handleSave = (e) => {
        e.preventDefault();
        if (note.id) {
            editNote(note);
        } else {
            console.error("Note ID is missing");
        }
        handleClose();
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={note.title}
                            onChange={onChange}
                            placeholder="Enter title"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={note.description}
                            onChange={onChange}
                            placeholder="Enter Description"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="tag">
                        <Form.Label>Tag</Form.Label>
                        <Form.Control
                            type="text"
                            name="tag"
                            value={note.tag}
                            onChange={onChange}
                            placeholder="Enter Tag"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Edit Note
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default ModalEdit;

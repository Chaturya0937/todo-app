import { List, ListItem, ListItemAvatar, ListItemText, Modal, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import './Todo.css';
import { db, doc, deleteDoc, setDoc } from './firebase1'; // Make sure to import setDoc
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Todo({ todo }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const handleDelete = async () => {
    try {
      const todoDoc = doc(db, 'todos', todo.id);
      await deleteDoc(todoDoc);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = async () => {
    try {
      const todoDoc = doc(db, 'todos', todo.id);
      await setDoc(todoDoc, {
        todo: input
      }, { merge: true });
      setOpen(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ width: 400, padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', borderRadius: 2 }}>
          <Typography variant="h6" component="h2">
            Edit Todo
          </Typography>
          <input placeholder={todo.todo} value={input} onChange={event => setInput(event.target.value)} />
          <Button onClick={updateTodo}>Update Todo</Button>
        </Box>
      </Modal>
      <List className="todo_list">
        <ListItem>
          <ListItemAvatar>
          </ListItemAvatar>
          <ListItemText primary={todo.todo} secondary="Dummy Deadline" />
        </ListItem>
        <Button onClick={handleOpen}>Edit</Button>
        <DeleteForeverIcon onClick={handleDelete} />
      </List>
    </>
  );
}

export default Todo;





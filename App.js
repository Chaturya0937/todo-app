// App.js

import './App.css';
import Todo from './Todo';
import { useState, useEffect } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Input } from '@mui/material';
import { db, collection, onSnapshot, addDoc, serverTimestamp } from './firebase1';
import { query, orderBy } from 'firebase/firestore';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const todosCollection = collection(db, 'todos');
    const todosQuery = query(todosCollection, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(todosQuery, (snapshot) => {
      setTodos(snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo })));
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const addTodo = async (event) => {
    // this will fire off when we click the button
    event.preventDefault(); // it will stop the refresh
    try {
      await addDoc(collection(db, 'todos'), {
        todo: input,
        timestamp: serverTimestamp()
      });
      setTodos([...todos, input]);
      setInput(''); // clear up the input after submitting
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Todo App</h1>
      <form>
        <FormControl>
          <InputLabel>✅ Write a todo</InputLabel>
          <Input value={input} onChange={(event) => setInput(event.target.value)} />
        </FormControl>
        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="success">
          Add Todo
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
}

export default App;

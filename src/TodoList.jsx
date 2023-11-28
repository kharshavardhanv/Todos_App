// TodoList.js
import React, { useState, useEffect } from "react";
import {
  List,
  Box,
  Typography,
  Button,
} from "@mui/material";
import TodoItem from "./TodoItem";
import AddTaskForm from "./AddTaskForm";

const getInitialData = () => {
  const data = JSON.parse(localStorage.getItem("todos"));
  if (!data) return [];
  return data;
};

export default function TodoList() {
  const [todos, setTodos] = useState(getInitialData);
  const [isFormOpen, setFormOpen] = useState(false);

  useEffect(() => {
    // Save tasks to local storage whenever todos change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const removeTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((t) => t.id !== id);
    });
  };

  const toggleTodo = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });
    });
  };

  const addTodo = (newTask) => {
    setTodos((prevTodos) => {
      // Sort tasks by priority (low -> medium -> high)
      const sortedTodos = [...prevTodos, newTask].sort((a, b) => {
        const priorityOrder = { low: 3, medium: 2, high: 1 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      return sortedTodos;
    });
  };
  

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        m: 3,
      }}
    >
      <Typography variant="h2" component="h1" sx={{ flexGrow: 1 }}>
        Todo List
      </Typography>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            remove={removeTodo}
            toggle={() => toggleTodo(todo.id)}
          />
        ))}
      </List>
      <Button onClick={openForm} variant="contained" color="primary" sx={{ mt: 2 }}>
        Add New Task
      </Button>
      <AddTaskForm open={isFormOpen} onClose={closeForm} addTodo={addTodo} />
    </Box>
  );
}

// AddTaskForm.js
import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const AddTaskForm = ({ open, onClose, addTodo }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleAddTask = () => {
    if (taskName.trim() === "") {
      console.log("Task name is required!");
      return;
    }

    const newTask = {
      text: taskName,
      description: taskDescription,
      priority: priority,
      id: crypto.randomUUID(),
      completed: false,
    };

    console.log("New Task:", newTask);
    addTodo(newTask);
    onClose();
    setTaskName("");
    setTaskDescription("");
    setPriority("low");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Name"
          type="text"
          fullWidth
          value={taskName}
          onChange={handleTaskNameChange}
          required
        />
        <TextareaAutosize
          margin="dense"
          label="Task Description"
          placeholder="Task description..."
          minRows={3}
          style={{ width: "100%" }}
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="priority-label">Priority Level</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            value={priority}
            label="Priority Level"
            onChange={handlePriorityChange}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddTask}>Add Task</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskForm;

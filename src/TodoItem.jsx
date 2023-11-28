
import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddTaskForm from "./AddTaskForm";

export default function TodoItem({ todo, remove, toggle, edit }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const removeTodo = () => {
    remove(todo.id);
  };

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton
          role={undefined}
          dense
          onClick={handleOpen}
          sx={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={todo.completed}
              tabIndex={-1}
              disableRipple
              inputProps={{ "aria-labelledby": `checkbox-list-label-${todo.id}` }}
              onChange={toggle}
            />
          </ListItemIcon>
          <ListItemText
            id={`checkbox-list-label-${todo.id}`}
            primary={todo.text}
            secondary={todo.description}
          />
        </ListItemButton>
        <IconButton edge="end" aria-label="comments" onClick={removeTodo}>
          <DeleteIcon />
        </IconButton>
        <IconButton edge="end" aria-label="edit" onClick={() => edit(todo)}>
          <EditIcon />
        </IconButton>
      </ListItem>

      <AddTaskForm open={open} onClose={handleClose} initialTask={todo} />
    </>
  );
}



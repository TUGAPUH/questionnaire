import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

export default function FormDialog({ isOpen, setIsOpen, value, setValue, handleClick }) {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogContent>
        <DialogContentText>Для продолжения введите ваше имя.</DialogContentText>
        <TextField
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          margin="dense"
          id="name"
          label="Введите имя"
          type="name"
          fullWidth
          variant="standard"
          value={value}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
        <Button onClick={handleClick}>Начать</Button>
      </DialogActions>
    </Dialog>
  );
}

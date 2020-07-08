import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { MediaItem } from "../../../api/app";
import { fetchMediaDataFromFileName } from "../../../api/wikipedia";

interface AddItemDialogProps {
  open: boolean;
  onClose: () => void;
  onNewItem: (item: MediaItem) => void;
}

export const AddItemDialog = ({
  open,
  onClose,
  onNewItem,
}: AddItemDialogProps) => {
  const [fileName, setFileName] = React.useState('');
  const handleSubmit = async () => {
    const fileData = await fetchMediaDataFromFileName(fileName);
    console.log("handleSubmit -> fileData", fileData)
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add item</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This will add a new item to this institution analytics
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="fileName"
          label="File name"
          type="text"
          fullWidth
          value={fileName}
          onChange={event => setFileName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

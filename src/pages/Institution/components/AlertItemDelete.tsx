import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface AlertItemDeleteProps {
  open: boolean,
  onClose: () => void,
  onAgree: () => void
}

export const AlertItemDelete = ({ open, onClose, onAgree }: AlertItemDeleteProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Remove this item from analytics?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Removing this item will change the analytics reports of this institution
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAgree} color="secondary" variant="outlined">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

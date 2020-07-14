import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { FileData, fetchFileData } from '../../../api/app';
import { useForm } from 'react-hook-form';
import { ItemSettingsCard } from './ItemSettingsCard';
import { useAddGlamMediaItem } from '../../../api/hook';
import { useRouteMatch } from 'react-router-dom';

interface AddItemDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddItemDialog = ({ open, onClose }: AddItemDialogProps) => {
  const { params } = useRouteMatch<{ glamId: string }>();
  const [fileData, setFileData] = React.useState<FileData>();
  const { register, handleSubmit, formState } = useForm<{ fileName: string }>();
  const [mutate, { isLoading }] = useAddGlamMediaItem(params.glamId);
  const onSubmit = async (data: { fileName: string }) => {
    const fileData = await fetchFileData(data.fileName);
    setFileData(fileData);
  };
  const onAdd = async () => {
    if (fileData) {
      mutate([fileData]);
      onClose();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Add item</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          This will add a new item to this institution analytics
        </DialogContentText>
        <form style={{ display: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            autoFocus
            margin='dense'
            id='fileName'
            name='fileName'
            label='File name'
            variant='outlined'
            type='text'
            fullWidth
            required
            inputRef={register}
            disabled={formState.isSubmitting}
          />
          <Button
            color='primary'
            type='submit'
            disabled={formState.isSubmitting}
          >
            Load
          </Button>
        </form>
        {fileData && <ItemSettingsCard item={fileData} preview />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onAdd}
          color='primary'
          variant='contained'
          disabled={!fileData || isLoading}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;

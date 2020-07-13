import React from 'react';
import { ItemSettingsCard } from './ItemSettingsCard';
import { GlamMediaItem } from '../../../lib/models';
import { FileData } from '../../../api/app';
import { makeStyles, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useAddGlamMediaItem } from '../../../api/hook';
import { useRouteMatch } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';

interface CategoryItemPreviewProps {
  categoryItem: FileData;
  existingItems?: GlamMediaItem[];
}

const useStyles = makeStyles((theme) => ({
  itemHolder: {
    display: 'flex',
    alignItems: 'center',
  },
  addButton: {
    marginLeft: theme.spacing(1),
  },
}));

const CategoryItemPreview = ({
  categoryItem,
  existingItems,
}: CategoryItemPreviewProps) => {
  const { params } = useRouteMatch<{ glamId: string }>();
  const classes = useStyles();
  const exists = React.useMemo(() => {
    return !!existingItems?.find((i) => i.file_path === categoryItem.file_path);
  }, [categoryItem, existingItems]);
  const [mutate, { isLoading }] = useAddGlamMediaItem(params.glamId);
  const handleOnAdd = () => {
    mutate([categoryItem]);
  };
  return (
    <div className={classes.itemHolder}>
      <ItemSettingsCard item={categoryItem} preview />
      {!exists && (
        <Button
          startIcon={<AddIcon />}
          color='primary'
          variant='contained'
          onClick={handleOnAdd}
          className={classes.addButton}
          disabled={isLoading}
        >
          Add item
        </Button>
      )}
      {exists && (
        <Chip label='Added' deleteIcon={<DoneIcon />} variant='outlined' />
      )}
    </div>
  );
};

export default CategoryItemPreview;

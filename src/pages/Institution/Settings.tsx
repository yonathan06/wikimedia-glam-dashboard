import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useGlamMediaItems } from '../../api/hook';
import { ItemSettingsCard } from './components/ItemSettingsCard';
import { MediaItem } from '../../api/app';
import { AddItemDialog } from './components/AddItemDialog';
import { useRouteMatch, Link } from 'react-router-dom';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const Settings = () => {
  const [addItemOpen, setAddItemOpen] = React.useState(false);
  const { params, url } = useRouteMatch<{ glamId: string }>();
  const { data: items } = useGlamMediaItems(params.glamId);
  const handleOnDeleteItem = (item: MediaItem) => {};
  const classes = useStyles();
  return (
    <div>
      {items?.map((item) => (
        <ItemSettingsCard
          key={item.filePath}
          item={item}
          onDelete={handleOnDeleteItem}
        />
      ))}
      <Button
        startIcon={<AddIcon />}
        color='primary'
        variant='contained'
        onClick={() => setAddItemOpen(true)}
        className={classes.button}
      >
        Add item
      </Button>
      <Button
        startIcon={<ListAltIcon />}
        color='primary'
        variant='outlined'
        component={Link}
        to={`${url}/importcategory`}
        className={classes.button}
      >
        Import from category
      </Button>
      <AddItemDialog open={addItemOpen} onClose={() => setAddItemOpen(false)} />
    </div>
  );
};

export default Settings;

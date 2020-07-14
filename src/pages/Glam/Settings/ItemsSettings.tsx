import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { ItemSettingsCard } from '../components/ItemSettingsCard';
import AddItemDialog from '../components/AddItemDialog';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { makeStyles } from '@material-ui/core';
import { useGlamMediaItems } from '../../../api/hook';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const ItemsSettings = () => {
  const [addItemOpen, setAddItemOpen] = React.useState(false);
  const { params, url } = useRouteMatch<{ glamId: string }>();
  const { data: items } = useGlamMediaItems(params.glamId);
  const classes = useStyles();
  return (
    <>
      <Box mb={3}>
        <Typography variant='h6' component='h6'>
          Media items
        </Typography>
      </Box>
      <Box mb={2}>
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
      </Box>
      {items?.map((item) => (
        <ItemSettingsCard key={item.file_path} item={item} />
      ))}

      <AddItemDialog open={addItemOpen} onClose={() => setAddItemOpen(false)} />
    </>
  );
};

export default ItemsSettings;

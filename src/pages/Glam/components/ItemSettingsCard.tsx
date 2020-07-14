import React from 'react';
import { Link } from 'react-router-dom';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AlertItemDelete from './AlertItemDelete';
import { GlamMediaItem } from '../../../lib/models';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      height: 150,
      marginBottom: theme.spacing(3),
      width: 450,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    content: {
      flex: '0 0 auto',
      height: 100,
    },
    cover: {
      width: 151,
      flexShrink: 0,
    },
  })
);

interface ItemSettingsCardProps {
  item: Partial<GlamMediaItem>;
  onDelete?: (item: GlamMediaItem) => void;
  preview?: boolean;
}

export const ItemSettingsCard = ({
  item,
  onDelete,
  preview,
}: ItemSettingsCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const classes = useStyles();
  const handleItemDelete = () => {
    setDeleteDialogOpen(false);
    if (onDelete) {
      onDelete(item as GlamMediaItem);
    }
  };
  return (
    <>
      <Card key={item.file_path} className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={item.thumbnail_url}
          title={item.title}
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component='h6' variant='h6'>
              {item.title}
            </Typography>
          </CardContent>
          {!preview && (
            <CardActions>
              <Button
                component={Link}
                to={`/glam/met/file/${encodeURIComponent(
                  item.file_path ?? ''
                )}`}
                size='small'
                color='primary'
              >
                Stats
              </Button>
              <Button
                size='small'
                variant='outlined'
                color='secondary'
                onClick={() => setDeleteDialogOpen(true)}
              >
                Remove
              </Button>
            </CardActions>
          )}
        </div>
      </Card>
      {!preview && (
        <AlertItemDelete
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onAgree={handleItemDelete}
        />
      )}
    </>
  );
};

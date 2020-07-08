import React from "react";
import { Link } from "react-router-dom";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AlertItemDelete } from "../components/AlertItemDelete";
import { MediaItem } from "../../../api/app";

function getThumbnailUrl(filePath: string) {
  const file = filePath.replace(/^\/wikipedia\/commons\/.\/..\//i, "");
  const filePathWithThumb = filePath.replace(
    /^\/wikipedia\/commons\//i,
    "/wikipedia/commons/thumb/"
  );
  return `https://upload.wikimedia.org${filePathWithThumb}/256px-${file}`;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      height: 150,
      marginBottom: theme.spacing(3),
      width: 450,
    },
    details: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    content: {
      flex: "0 0 auto",
      height: 100,
    },
    cover: {
      width: 151,
      flexShrink: 0,
    },
  })
);

interface ItemSettingsCardProps {
  item: MediaItem;
  onDelete: (item: MediaItem) => void;
}

export const ItemSettingsCard = ({ item, onDelete }: ItemSettingsCardProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const classes = useStyles();
  const handleItemDelete = () => {
    setDeleteDialogOpen(false);
    onDelete(item);
  };
  return (
    <>
      <Card key={item.filePath} className={classes.root}>
        <CardMedia
          className={classes.cover}
          image={getThumbnailUrl(item.filePath)}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {item.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {item.descriptionHTML}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={Link}
              to={`/inst/met/file/${encodeURIComponent(item.filePath)}`}
              size="small"
              color="primary"
            >
              Stats
            </Button>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Remove
            </Button>
          </CardActions>
        </div>
      </Card>
      <AlertItemDelete
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onAgree={handleItemDelete}
      />
    </>
  );
};

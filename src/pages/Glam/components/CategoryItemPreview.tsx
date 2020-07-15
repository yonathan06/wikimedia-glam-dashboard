import React from "react";
import { ItemSettingsCard } from "./ItemSettingsCard";
import { GlamMediaItem } from "../../../lib/models";
import { FileData } from "../../../api/app";
import { makeStyles, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DoneIcon from "@material-ui/icons/Done";
import { useAddGlamMediaItem } from "../../../api/hook";
import { useRouteMatch } from "react-router-dom";

interface CategoryItemPreviewProps {
  categoryItem: FileData;
  existingItems?: GlamMediaItem[];
}

const useStyles = makeStyles((theme) => ({
  itemHolder: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "end",
  },
  addButton: {
    marginTop: theme.spacing(1),
  },
}));

const StartIcon = ({ exists }: { exists: boolean }) => {
  if (exists) {
    return <DoneIcon />;
  }
  return <AddIcon />;
};

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
      <Button
        startIcon={<StartIcon exists={exists} />}
        color="primary"
        onClick={handleOnAdd}
        className={classes.addButton}
        disabled={isLoading || exists}
      >
        {!exists ? "Add item" : "Added"}
      </Button>
    </div>
  );
};

export default CategoryItemPreview;

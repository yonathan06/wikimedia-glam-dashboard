import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useGlamMediaItems } from "../../api/hook";
import { ItemSettingsCard } from "./components/ItemSettingsCard";
import { MediaItem } from "../../api/app";
import { AddItemDialog } from "./components/AddItemDialog";
import { useRouteMatch } from "react-router-dom";

const Settings = () => {
  const [addItemOpen, setAddItemOpen] = React.useState(false);
  const { params } = useRouteMatch<{ glamId: string }>();
  const { data: items } = useGlamMediaItems(params.glamId);
  const handleOnDeleteItem = (item: MediaItem) => {};
  const handleOnNewItem = (item: MediaItem) => {};
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
        color="primary"
        variant="contained"
        onClick={() => setAddItemOpen(true)}
      >
        Add item
      </Button>
      <AddItemDialog
        open={addItemOpen}
        onClose={() => setAddItemOpen(false)}
        onNewItem={handleOnNewItem}
      />
    </div>
  );
};

export default Settings;

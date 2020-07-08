import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useMediaItemsList } from "../../api/hook";
import { ItemSettingsCard } from "./components/ItemSettingsCard";
import { MediaItem } from "../../api/app";
import { AddItemDialog } from "./components/AddItemDialog";

const Settings = () => {
  const [addItemOpen, setAddItemOpen] = React.useState(false);
  const { data: items } = useMediaItemsList();
  const handleOnDeleteItem = (item: MediaItem) => {};
  const handleOnNewItem = (item: MediaItem) => {};
  return (
    <div>
      {items.map((item) => (
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

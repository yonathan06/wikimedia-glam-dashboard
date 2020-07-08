import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { useMediaItemsList } from "../../api/hook";
import { ItemSettingsCard } from "./components/ItemSettingsCard";
import { MediaItem } from "../../api/app";

const Settings = () => {
  const { data: items } = useMediaItemsList();
  const handleOnDeleteItem = (item: MediaItem) => {

  }
  return (
    <div>
      {items.map((item) => (
        <ItemSettingsCard key={item.filePath} item={item} onDelete={handleOnDeleteItem} />
      ))}
      <Button startIcon={<AddIcon />} color="primary" variant="contained">
        Add item
      </Button>
    </div>
  );
};

export default Settings;

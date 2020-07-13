import React from 'react';
import { ItemSettingsCard } from './ItemSettingsCard';
import { GlamMediaItem } from '../../../lib/models';
import { FileData } from '../../../api/app';

interface CategoryItemPreviewProps {
  categoryItem: FileData;
  existingItems?: GlamMediaItem[];
}

const CategoryItemPreview = ({
  categoryItem,
  existingItems,
}: CategoryItemPreviewProps) => {
  return (
    <div>
      {categoryItem && <ItemSettingsCard item={categoryItem} preview />}
    </div>
  );
};

export default CategoryItemPreview;

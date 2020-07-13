import React from 'react';
import { useFileData } from '../../../api/hook';
import { ItemSettingsCard } from './ItemSettingsCard';
import { GlamMediaItem } from '../../../lib/models';

interface CategoryItemPreviewProps {
  categoryItem: {
    pageid: number;
    ns: number;
    title: string;
  };
  existingItems?: GlamMediaItem[];
}

const CategoryItemPreview = ({
  categoryItem,
  existingItems,
}: CategoryItemPreviewProps) => {
  const { data: fileData } = useFileData(categoryItem.title);

  return <div>{fileData && <ItemSettingsCard item={fileData} preview />}</div>;
};

export default CategoryItemPreview;

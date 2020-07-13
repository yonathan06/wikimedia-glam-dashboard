import {
  WikipediaStatsItem,
  fetchMediaBiweeklyStats,
  DateFormat,
} from './wikipedia';
import { useState, useEffect } from 'react';
import {
  getGlamMediaItems,
  addMediaItems,
  fetchFileData,
  FileData,
} from './app';
import sub from 'date-fns/sub';
import parse from 'date-fns/parse';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import isSameDay from 'date-fns/isSameDay';
import { useQuery, useMutation, queryCache } from 'react-query';
import { GlamMediaItem, Glam } from '../lib/models';

export interface MainStats {
  mediaItemsBiweekly: {
    [filePath: string]: WikipediaStatsItem[];
  };
  mediaItemsWeeklySum: {
    [filePath: string]: number;
  };
  mediaItemsDaily: {
    [filePath: string]: WikipediaStatsItem | undefined;
  };
  biweekly: WikipediaStatsItem[];
  weeklySum: number;
}

export interface MediaItemStats {
  biweekly: WikipediaStatsItem[];
  weeklySum: number;
  yesterdaySum: number;
}

const initialState: MainStats = {
  mediaItemsBiweekly: {},
  mediaItemsWeeklySum: {},
  mediaItemsDaily: {},
  biweekly: [],
  weeklySum: 0,
};

async function loadStats(mediaItems: GlamMediaItem[]) {
  const fetchAllItemsStats = mediaItems.map((item) =>
    fetchMediaBiweeklyStats(item.file_path)
  );
  const results = await Promise.all(fetchAllItemsStats);
  const calculatedStats = results.reduce(
    (state, result, index) => {
      const { data } = result;
      if (data) {
        const { items } = data;
        const { file_path } = mediaItems[index];
        const yesterday = sub(new Date(), { days: 1 });
        state.mediaItemsBiweekly[file_path] = items;
        state.mediaItemsWeeklySum[file_path] = 0;
        items.forEach((item) => {
          const itemDate = parse(item.timestamp, DateFormat, new Date());
          if (isSameDay(yesterday, itemDate)) {
            state.mediaItemsDaily[file_path] = item;
          }
          if (differenceInCalendarDays(yesterday, itemDate) <= 6) {
            state.weeklySum += item.requests;
            state.mediaItemsWeeklySum[file_path] += item.requests;
          }
          const totalBiweeklyItemIndex = state.biweekly.findIndex(
            (totalItem) => totalItem.timestamp === item.timestamp
          );
          if (totalBiweeklyItemIndex === -1) {
            state.biweekly.push({
              ...item,
              file_path: 'all_items',
            });
          } else {
            const totalItem = state.biweekly[totalBiweeklyItemIndex];
            totalItem.requests += item.requests;
            state.biweekly.splice(totalBiweeklyItemIndex, 1, totalItem);
          }
        });
      }
      return state;
    },
    { ...initialState }
  );
  return calculatedStats;
}

export const useStats = (mediaItems?: GlamMediaItem[]) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      if (mediaItems) {
        setLoading(true);
        if (mediaItems?.length > 0) {
          const stats = await loadStats(mediaItems);
          setData(stats);
        } else {
          setData(initialState);
        }
        setLoading(false);
      }
    })();
  }, [mediaItems]);
  return { data, loading };
};

export const useMediaItemStats = (filePath: string) => {
  const [data, setData] = useState<MediaItemStats>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{ detail: string }>();
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (filePath) {
        const { data, error } = await fetchMediaBiweeklyStats(filePath);
        if (error) {
          setError(error);
        } else if (data) {
          const { items } = data;
          const stats: MediaItemStats = {
            biweekly: items,
            weeklySum: 0,
            yesterdaySum: 0,
          };
          items.forEach((item) => {
            const yesterday = sub(new Date(), { days: 1 });
            const itemDate = parse(item.timestamp, DateFormat, new Date());
            if (isSameDay(yesterday, itemDate)) {
              stats.yesterdaySum = item.requests;
            }
            if (differenceInCalendarDays(yesterday, itemDate) <= 6) {
              stats.weeklySum += item.requests;
            }
          });
          setData(stats);
        }
      }
      setLoading(false);
    })();
  }, [filePath]);
  return { data, error, loading };
};

export const useGlamData = (glamId: string) => {
  return useQuery(
    ['glam', glamId],
    async (_, glamId: string) => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/glam/${glamId}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      return data as Glam;
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!glamId,
    }
  );
};

const GlamMediaItemKey = 'glamMediaItems';

export const useGlamMediaItems = (glamId: string) => {
  return useQuery(
    [GlamMediaItemKey, glamId],
    async (_, glamId: string) => {
      return await getGlamMediaItems(glamId);
    },
    { refetchOnMount: false, refetchOnWindowFocus: false }
  );
};

export const useGlamMediaItem = (glamId: string, file_path: string) => {
  return useQuery(
    [GlamMediaItemKey, glamId, 'item', file_path],
    async (glamKey, glamId, itemKey, file_path) => {
      const items = queryCache.getQueryData<GlamMediaItem[]>([glamKey, glamId]);
      return items?.find((item) => item.file_path === file_path);
    }
  );
};

export const useFileData = (fileName: string) => {
  return useQuery(
    ['fileData', fileName],
    (key, fileName) => fetchFileData(fileName),
    { refetchOnWindowFocus: false, enabled: fileName }
  );
};

export const useAddGlamMediaItem = (glamId: string) => {
  return useMutation<GlamMediaItem[], FileData[]>(
    (items) => {
      return addMediaItems(glamId, items);
    },
    {
      onSuccess: (items) => {
        items.forEach((item) => {
          queryCache.setQueryData(
            [GlamMediaItemKey, glamId, 'item', item.file_path],
            item
          );
        });
        const oldItems = queryCache.getQueryData<GlamMediaItem[]>([
          GlamMediaItemKey,
          glamId,
        ]);
        queryCache.setQueryData(
          [GlamMediaItemKey, glamId],
          [...(oldItems ?? []), ...items]
        );
      },
    }
  );
};

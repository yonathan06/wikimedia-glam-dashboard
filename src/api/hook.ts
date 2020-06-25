import { WikipediaStatsItem, fetchMediaBiweeklyStats, DateFormat } from "./wikipedia";
import { useState, useEffect } from "react";
import { MediaItem } from "./app";
import sub from "date-fns/sub";
import parse from "date-fns/parse";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import isSameDay from "date-fns/isSameDay";

export interface GlobalState {
  mediaItemsBiweekly: {
    [filePath: string]: WikipediaStatsItem[]
  },
  mediaItemsDaily: {
    [filePath: string]: WikipediaStatsItem | undefined
  },
  biweekly: WikipediaStatsItem[],
  weeklySum: number
}

const initialState: GlobalState = {
  mediaItemsBiweekly: {},
  mediaItemsDaily: {},
  biweekly: [],
  weeklySum: 0
}

async function loadStats(mediaItems: MediaItem[]) {
  const fetchAllItemsStats = mediaItems.map((item) => fetchMediaBiweeklyStats(item.filePath));
  const results = await Promise.all(fetchAllItemsStats);
  return results.reduce((state, result, index) => {
    const { data } = result;
    if (data) {
      const { items } = data;
      const { filePath } = mediaItems[index];
      const yesterday = sub(new Date(), { days: 1 });
      state.mediaItemsBiweekly[mediaItems[index].filePath] = items;
      
      items.forEach(item => {
        const itemDate = parse(item.timestamp, DateFormat, new Date());
        if (isSameDay(yesterday, itemDate)) {
          state.mediaItemsDaily[filePath] = item;
        }
        if (differenceInCalendarDays(yesterday, itemDate) <= 6) {
          state.weeklySum += item.requests;
        }
        const totalBiweeklyItemIndex = state.biweekly.findIndex(totalItem => totalItem.timestamp === item.timestamp);
        if (totalBiweeklyItemIndex === -1) {
          state.biweekly.push({
            ...item,
            file_path: 'all_items'
          });
        } else {
          const totalItem = state.biweekly[totalBiweeklyItemIndex];
          totalItem.requests += item.requests;
          state.biweekly.splice(totalBiweeklyItemIndex, 1, totalItem);
        }
      });
    }
    return state;
  }, { ...initialState });
}

export const useStats = (mediaItems: MediaItem[]) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    if (mediaItems?.length > 0) {
      loadStats(mediaItems).then(setData);
    } else {
      setData(initialState);
    }
    setLoading(false);
  }, [mediaItems]);
  return { data, loading };
}
import { WikipediaStatsItem, fetchMediaBiweeklyStats, DateFormat } from "./wikipedia";
import { useState, useEffect } from "react";
import { MediaItem, getInstMediaItems } from "./app";
import sub from "date-fns/sub";
import parse from "date-fns/parse";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import isSameDay from "date-fns/isSameDay";

export interface MainStats {
  mediaItemsBiweekly: {
    [filePath: string]: WikipediaStatsItem[]
  },
  mediaItemsWeeklySum: {
    [filePath: string]: number
  }
  mediaItemsDaily: {
    [filePath: string]: WikipediaStatsItem | undefined
  },
  biweekly: WikipediaStatsItem[],
  weeklySum: number
}

export interface MediaItemStats {
  biweekly: WikipediaStatsItem[],
  weeklySum: number,
  yesterdaySum: number
}

const initialState: MainStats = {
  mediaItemsBiweekly: {},
  mediaItemsWeeklySum: {},
  mediaItemsDaily: {},
  biweekly: [],
  weeklySum: 0
}

async function loadStats(mediaItems: MediaItem[]) {
  const fetchAllItemsStats = mediaItems.map((item) => fetchMediaBiweeklyStats(item.filePath));
  const results = await Promise.all(fetchAllItemsStats);
  const calculatedStats = results.reduce((state, result, index) => {
    const { data } = result;
    if (data) {
      const { items } = data;
      const { filePath } = mediaItems[index];
      const yesterday = sub(new Date(), { days: 1 });
      state.mediaItemsBiweekly[filePath] = items;
      state.mediaItemsWeeklySum[filePath] = 0;
      items.forEach(item => {
        const itemDate = parse(item.timestamp, DateFormat, new Date());
        if (isSameDay(yesterday, itemDate)) {
          state.mediaItemsDaily[filePath] = item;
        }
        if (differenceInCalendarDays(yesterday, itemDate) <= 6) {
          state.weeklySum += item.requests;
          state.mediaItemsWeeklySum[filePath] += item.requests;
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
  return calculatedStats;
}

export const useStats = (mediaItems: MediaItem[]) => {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (mediaItems?.length > 0) {
        const stats = await loadStats(mediaItems);
        setData(stats);
      } else {
        setData(initialState);
      }
      setLoading(false);
    })();
  }, [mediaItems]);
  return { data, loading };
}

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
        } else if(data){
          const { items } = data;
          const stats: MediaItemStats = {
            biweekly: items,
            weeklySum: 0,
            yesterdaySum: 0,
          }
          items.forEach(item => {
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
}

export const useMediaItemsList = () => {
  const [data, setData] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getInstMediaItems().then((items) => {
      setData(items);
      setLoading(false);
    });
  }, []);
  return { data, loading };
};
import formatDate from "date-fns/format";
import sub from "date-fns/sub";

type referer = "all-referers"
  | "internal"
  | "external"
  | "search-engine"
  | "unknown"
  | "none"

type agent = "all-agents" | "user" | "spider"

type granularity = "daily" | "monthly";

interface FetchMediaRequestStatsOptions {
  referrers?: referer
  agents?: agent;
  filePath: string;
  granularity?: granularity;
  start: Date;
  end: Date;
}

export interface WikipediaStatsItem {
  referer: referer,
  "file_path": string,
  agent: agent,
  granularity: granularity,
  timestamp: string,
  requests: number
}

export interface WikipediaStats {
  items: WikipediaStatsItem[]
}

const defaultOptions: Partial<FetchMediaRequestStatsOptions> = {
  referrers: "all-referers",
  agents: "user",
  granularity: "monthly",
};

export const DateFormat = 'yyyyMMddHH'

export async function fetchMediaRequestStats(
  options: FetchMediaRequestStatsOptions
  ): Promise<{ 
    data?: WikipediaStats, 
    error?: {
      detail: string
    } 
  }> {
  options = {
    ...defaultOptions,
    ...options,
  };
  const response = await fetch(
    `https://wikimedia.org/api/rest_v1/metrics/mediarequests/per-file/${
    options.referrers
    }/${options.agents}/${encodeURIComponent(options.filePath)}/${
    options.granularity
    }/${formatDate(options.start, DateFormat)}/${formatDate(
      options.end,
      DateFormat
    )}`
  );
  const data = await response.json();
  if (response.ok) {
    return {
      data,
    }
  }
  return {
    error: data
  };
}

export async function fetchMediaBiweeklyStats(filePath: string) {
  const yesterday = sub(new Date(), { days: 1 });
  const twoWeeksAgo = sub(yesterday, { days: 13 });
  return await fetchMediaRequestStats({
    filePath,
    start: new Date(twoWeeksAgo),
    end: new Date(yesterday),
    granularity: 'daily'
  });
}

import formatDate from "date-fns/format";

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

export interface WikipediaStats {
  items: Array<{
    referer: referer,
    "file_path": string,
    agent: agent,
    granularity: granularity,
    timestamp: string,
    requests: number
  }>
}

const defaultOptions: Partial<FetchMediaRequestStatsOptions> = {
  referrers: "all-referers",
  agents: "user",
  granularity: "monthly",
};

export async function fetchMediaRequestStats(
  options: FetchMediaRequestStatsOptions
): Promise<{ ok: boolean, data: WikipediaStats }> {
  options = {
    ...defaultOptions,
    ...options,
  };
  const response = await fetch(
    `https://wikimedia.org/api/rest_v1/metrics/mediarequests/per-file/${
    options.referrers
    }/${options.agents}/${encodeURIComponent(options.filePath)}/${
    options.granularity
    }/${formatDate(options.start, "yyyyMMddHH")}/${formatDate(
      options.end,
      "yyyyMMddHH"
    )}`
  );
  const data = await response.json();
  return {
    ok: response.ok,
    data,
  };
}

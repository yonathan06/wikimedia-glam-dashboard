import React, { useMemo } from "react";
import { fetchMediaRequestStats, DateFormat } from "../api/wikipedia";
import { Area, AreaChart, XAxis, YAxis, Tooltip } from "recharts";
import { useQuery } from "react-query";
import parseToDate from "date-fns/parse";
import formatDate from "date-fns/format";
import { FormValues } from "../lib/models";
import { MonthDateFormat } from "../lib/constants";
import { getMediaImageUrlFromFilePath } from "../lib/utils";

const MediaStats = (props: FormValues) => {
  const chartHeight = 400;
  const { data: items, status } = useQuery(
    ["mediastats", props],
    async () => {
      const { data } = await fetchMediaRequestStats(props);
      return data?.items;
    },
    {
      refetchInterval: false,
    }
  );
  const stats = useMemo(() => {
    return items?.map((item: any) => {
      const date = parseToDate(item.timestamp, DateFormat, new Date());
      return {
        name: formatDate(date, MonthDateFormat),
        requests: item.requests,
      };
    });
  }, [items]);
  if (status === "loading") {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-center" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-md-6">
        <img
          style={{ width: '100%', maxHeight: chartHeight, objectFit: 'contain' }}
          src={getMediaImageUrlFromFilePath(props.filePath)}
          alt={props.filePath}
        />
      </div>
      <div className="col-md-6">
        <h3>Views/Month</h3>
        <AreaChart
          width={500}
          height={chartHeight}
          data={stats}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="requests"
            stroke="#17a2b8"
            fill="#17a2b8"
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default MediaStats;

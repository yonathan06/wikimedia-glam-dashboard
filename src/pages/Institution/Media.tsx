import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import sub from 'date-fns/sub'
import MediaStats from "../../components/MediaStats";
import { getMedia } from "../../api/app";
import "react-datepicker/dist/react-datepicker.css";

const Media = () => {
  const { search } = useLocation();
  const queryStrings = new URLSearchParams(search);
  const filePath = queryStrings.get('filePath') ?? '';
  const fileData = useMemo(() => getMedia(filePath), [filePath]);
  return (
    <div className="container mt-5">
      <h1 className="mb-4">{fileData?.title}</h1>
      <MediaStats start={sub(new Date(), { years: 1 })} end={new Date()} filePath={filePath} />
    </div>
  );
};

export default Media;

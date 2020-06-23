import React from "react";
import { getOrgMediaList } from "../../api/app";
import { getMediaImageUrlFromFilePath } from "../../lib/utils";
import { Link } from "react-router-dom";

const OrganizationOverview = () => {
  return (
    <div className="container mt-5">
      <div className="row row-cols-1 row-cols-md-3">
        {getOrgMediaList().map((item) => (
          <div key={item.filePath} className="col mb-4">
            <div className="card position-relative">
              <img
                style={{ height: 300, objectFit: 'cover' }}
                src={getMediaImageUrlFromFilePath(item.filePath)}
                className="card-img-top"
                alt={item.filePath}
              />
              <div className="card-body">
                <h5 className="card-title">
                  <Link className="stretched-link" to={`/org/met/media?filePath=${item.filePath}`}>
                    {item.title}
                  </Link>
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizationOverview;

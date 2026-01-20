import "./Skeleton.css";
import React from "react";

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img"></div>
      <div className="skeleton-title"></div>
      <div className="skeleton-info"></div>
    </div>
  );
}

export default SkeletonCard;

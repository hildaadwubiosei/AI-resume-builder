import React from "react";

const SummaryPreview = ({ resumeInfo }) => {
  return <p className="text-sm">{resumeInfo?.summary}</p>;
};

export default SummaryPreview;

import { Notebook } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ResumeCardItem = ({ resume }) => {
  console.log(resume, "this is resume lane");
  return (
    <Link to={"/dashboard/resume/" + resume.id + "/edit"}>
      <div className="p-14 bg-secondary flex justify-center items-center h-[280px] border border-primary rounded-lg hover:scale-105 transition-all  hover:shadow-md  shadow-primary cursor-pointer">
        <Notebook />
      </div>
      <h2 className="text-center my-1 text-black">{resume.attributes.title}</h2>
    </Link>
  );
};

export default ResumeCardItem;

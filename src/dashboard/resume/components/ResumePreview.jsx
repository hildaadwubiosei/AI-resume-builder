import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationPreview from "./preview/EducationPreview";
import SkillPreview from "./preview/SkillPreview";

const ResumePreview = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  return (
    <div
      className=" shadow-lg h-full p-14 border-t-[20px]"
      style={{
        borderColor: resumeInfo?.themeColor,
      }}
    >
      {/* personal detail */}
      <PersonalDetailPreview resumeInfo={resumeInfo} />

      {/* summary */}
      <SummaryPreview resumeInfo={resumeInfo} />

      {/* Professional Experience */}
      <ExperiencePreview resumeInfo={resumeInfo} />

      {/* Education preview */}
      <EducationPreview resumeInfo={resumeInfo}/>

      {/* skills preview */}
      <SkillPreview resumeInfo={resumeInfo}/>
    </div>
  );
};

export default ResumePreview;

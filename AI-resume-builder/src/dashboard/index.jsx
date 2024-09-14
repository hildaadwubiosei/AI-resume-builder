import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/ResumeCardItem";
import { Toaster } from "@/components/ui/sonner";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    user && getResumesList();
  }, [user]);

  // this gets the users Resumes list
  const getResumesList = () => {
    GlobalApi.getUsersResume(user?.primaryEmailAddress?.emailAddress).then(
      (resp) => {
        if (resp) {
          console.log(resp.data);
          setResumeList(resp.data.data);
        }
      },
      (error) => {
        console.log(error, "this is an error sorry");
      }
    );
  };
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">Resume</h2>
      <p>Start creating AI resume for your next Job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => {
            return <ResumeCardItem resume={resume} key={index} />;
          })}
      </div>
    </div>
  );
}

export default Dashboard;

import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import GlobalApi from "../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

function PersonalDetails({ enableNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    e.preventDefault();
    enableNext(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const data = {
    data: formData,
  };

  const onSave = (e) => {
    e.preventDefault();
    enableNext(true);
    setLoading(true);
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        if (resp) {
          enableNext(true);
          setLoading(false);
          toast.success("Details Updated");
        }
      },
      (error) => {
        console.log(error);
        setLoading(false);
      }
    );
  };
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary  border-t-4 mt-10">
      <h3 className="font-bold text-lg">Personal Detail</h3>
      <p>Get Started with the basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grids-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.firstName}
            />
          </div>
          <div>
            <label className="text-sm">Last Name
            
            </label>
            <Input
              name="lastName"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input
              name="jobTitle"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.address}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.phone}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              onChange={handleInputChange}
              required
              defaultValue={resumeInfo?.email}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="save" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;

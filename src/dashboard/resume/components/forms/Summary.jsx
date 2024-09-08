import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

import { useContext, useEffect, useState } from "react";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

const Summary = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    summary &&
      setResumeInfo({
        ...resumeInfo,
        summary: summary,
      });
  }, [summary]);

  const data = {
    data: { summary: summary },
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
          toast.success("Summary Updated");
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
      <h3 className="font-bold text-lg">Professional Summary</h3>
      <p>Add summary for your job title</p>
      <form className="mt-7" onSubmit={onSave}>
        <div className="flex justify-between items-end">
          <label>Add summary</label>
          <Button
            size="sm"
            variant="outline"
            className="border-primary text-primary flex gap-2"
            type="Button"
          >
            <Brain/>
            Generate from AI
          </Button>
        </div>
        <Textarea
          className="mt-5"
          defaultValue={resumeInfo?.summary}
          required
          onChange={(e) => setSummary(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <Button type="save" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Summary;

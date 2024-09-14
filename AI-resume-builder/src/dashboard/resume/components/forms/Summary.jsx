import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

import { useContext, useEffect, useState } from "react";
import GlobalApi from "../../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { Brain, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { AIChatSession } from "../../../../../service/AIModel";

const Summary = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState();

  const prompt = `
  Generate three resume summaries for a {jobTitle} Full Stack Developer position, one each for Fresher, Mid-level, and Experienced levels. Each summary should be 4-5 lines long, written in a natural, human-like tone. Do not use placeholders like [number of years]. Instead, use specific details that are generally applicable. 
  
  Please format the response as a JSON array of objects, where each object has two fields: 'experience_level' and 'summary'. Ensure that the text in the 'summary' field includes proper spacing and punctuation for readability.
  
  Example format:
  [
    {
      "experience_level": "Fresher",
      "summary": "Recent computer science graduate with a passion for full stack development..."
    },
    {
      "experience_level": "Mid-level",
      "summary": "Dedicated full stack developer with three years of experience..."
    },
    {
      "experience_level": "Experienced",
      "summary": "Seasoned full stack developer with over five years of industry experience..."
    }
  ]
  
  Remember to tailor the content to the specific {jobTitle} role while keeping it general enough to be widely applicable.`;

  useEffect(() => {
    if (resumeInfo?.summary) {
      setSummary(resumeInfo.summary);
    }
  }, [resumeInfo?.summary]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    try {
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo.jobTitle);
      console.log("Prompt:", PROMPT);

      const results = await AIChatSession.sendMessage(PROMPT);
      const rawResponse = await results.response.text();
      console.log("Raw response:", rawResponse);

      // Parse the JSON array directly
      const jsonObjects = JSON.parse(rawResponse);

      console.log("Parsed response:", jsonObjects);
      setAiGenerateSummaryList(jsonObjects);
    } catch (error) {
      console.error("Error in GenerateSummaryFromAI:", error);
      console.error("Raw response:", rawResponse);
      // Handle the error appropriately, maybe set an error state
    } finally {
      setLoading(false);
    }
  };

  const data = {
    data: { summary: summary },
  };

  const HandleSummaryChange = (data) => {
    setSummary(data);
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      summary: data,
    }));
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
            onClick={() => GenerateSummaryFromAI()}
          >
            <Brain />
            Generate from AI
          </Button>
        </div>
        <Textarea
          className="mt-5"
          value={summary}
          required
          onChange={(e) => setSummary(e.target.value)}
        />
        <div className="mt-2 flex justify-end">
          <Button type="save" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
      {aiGeneratedSummaryList && (
        <div>
          <h2 className="font-bold text-lg ">Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              className="shadow-lg p-4 mb-4 bg-white rounded cursor-pointer"
              onClick={() => HandleSummaryChange(item.summary)}
            >
              <h2 className="font-bold text-md mb-2 text-primary">
                Level: {item?.experience_level}
              </h2>
              <p className="text-sm leading-relaxed break-words">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summary;

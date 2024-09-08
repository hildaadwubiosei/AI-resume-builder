import React, { useState } from "react";
import PersonalDetails from "./forms/PersonalDetails";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import Summary from "./forms/Summary";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" className="flex gap-2">
          {" "}
          <LayoutGrid />
          Theme
        </Button>
        <div className="flex gap-2">
          {activeFormIndex > 1 && (
            <Button
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            className="flex gap-2 "
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
            // disabled={!enableNext}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {/* personal detail */}
      {activeFormIndex === 1 ? (
        <PersonalDetails enableNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summary enableNext={(v) => setEnableNext(v)}/>
      ) : null}
      {/* summary */}

      {/* experience */}

      {/* education */}

      {/* skills */}
    </div>
  );
};

export default FormSection;

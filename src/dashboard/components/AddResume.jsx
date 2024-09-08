import { Loader2, PlusSquare } from "lucide-react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GlobalApi from "../../../service/GlobalApi";

import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [openDiag, setOpenDiag] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const create = () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    console.log(data, "data");
    GlobalApi.createNewResume(data).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          setLoading(false);
          navigate("/dashboard/resume/" + resp.data.data.id + "/edit");
        }
      },
      (error) => {
        setLoading(false);
        console.log(error, "errors");
      }
    );
  };

  const handleDialogToggle = () => {
    setOpenDiag(!openDiag); // Toggles the dialog open/close
  };

  return (
    <div>
      {/* Triggering the dialog on click */}
      <div
        onClick={handleDialogToggle}
        className="p-14 py-24 items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed border border-black"
      >
        <PlusSquare />
      </div>

      {/* Dialog with the open state controlled by openDiag */}
      <Dialog open={openDiag} onOpenChange={setOpenDiag}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume </DialogTitle>
            <DialogDescription>
              <p>Add title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Senior Developer"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button variant="ghost" onClick={handleDialogToggle}>
                Cancel
              </Button>
              <Button onClick={create} disabled={!resumeTitle || loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;

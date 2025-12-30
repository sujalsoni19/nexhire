import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/useFetch";
import { DownloadIcon, BriefcaseBusiness, School, Boxes } from "lucide-react";
import { Button } from "./ui/button";
import { BarLoader } from "react-spinners";
import { updateApplication } from "@/api/apiApplications";

function ApplicationCard({ application, isCandidate = false }) {
  const { fn: fnupdateApplication, loading: loadingupdateApplication } =
    useFetch(updateApplication, {
      job_id: application.job_id,
    });

  const handleStatusChange = (status) => {
    fnupdateApplication(status);
  };

  return (
    <div>
      <Card>
        {loadingupdateApplication && 
         <div className="w-full">
            <BarLoader color="blue" width="100%"/>
         </div>}
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {isCandidate
              ? `${application?.job?.title} at ${application?.job?.company?.name}`
              : application?.name}
            <a
              href={application?.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <DownloadIcon />
              </Button>
            </a>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
            <div className="flex gap-2 items-center">
              <BriefcaseBusiness size={20} />
              {application?.experience} years of experience
            </div>
            <div className="flex gap-2 items-center capitalize">
              <School size={20} />
              {application?.education}
            </div>
            <div className="flex gap-2 items-center">
              <Boxes size={20} />
              {application?.skills}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <span>{new Date(application?.created_at).toLocaleDateString()}</span>
          {isCandidate ? (
            <span className="capitalize font-bold">
              Status: {application?.status}
            </span>
          ) : (
            <Select
              onValueChange={handleStatusChange}
              defaultValue={application?.status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Application Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interviewing">Interviewing</SelectItem>
                  <SelectItem value="hired">Hired</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default ApplicationCard;

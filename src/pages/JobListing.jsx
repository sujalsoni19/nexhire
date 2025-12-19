import { getJobs } from "@/api/apiJobs";
import useFetch from "@/hooks/useFetch";
import { useUser } from "@clerk/clerk-react";
import { DotLoader } from "react-spinners";
import Jobcard from "@/components/Jobcard";
import React, { useEffect, useState } from "react";

function JobListing() {
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const [searchQuery, setsearchQuery] = useState("");
  const { isLoaded } = useUser();

  const {
    fn: fnJobs,
    data: Jobs,
    loading: loadingJobs,
    error,
  } = useFetch(getJobs, { location, company_id, searchQuery });

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  if (!isLoaded) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <DotLoader color="blue" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full mt-10 px-2">
      <h1
        className="text-2xl sm:text-4xl
              md:text-6xl font-extrabold text-center
              bg-clip-text text-transparent
              bg-linear-to-r
              from-slate-900 via-slate-700 to-slate-500
              dark:from-slate-100 dark:via-slate-300 dark:to-slate-500"
      >
        Latest Jobs
      </h1>

      {loadingJobs && (
        <div className="flex-1 w-full flex justify-center items-center">
          <DotLoader color="blue" />
        </div>
      )}

      {loadingJobs === false && (
        <div className="mt-12 px-4 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Jobs?.length ? (
            Jobs?.map((job) => {
              return <Jobcard key={job.id}
               job={job}
               savedInit={job?.saved?.length > 0} />;
            })
          ) : (
            <div>No Jobs Found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default JobListing;

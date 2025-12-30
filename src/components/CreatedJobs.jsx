import React, { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { DotLoader } from "react-spinners";
import { useUser } from "@clerk/clerk-react";
import Jobcard from "./Jobcard";
import { getMyJobs } from "@/api/apiJobs";


function CreatedJobs() {

    const { user } = useUser();

  const {
    fn: fngetMyJobs,
    data: datagetMyJobs,
    loading: loadinggetMyJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fngetMyJobs();
  }, []);

  if (loadinggetMyJobs) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <DotLoader color="blue" />
      </div>
    );
  }
    
  return (
    <div>
      <div className="mt-6 sm:mt-12 px-4 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {datagetMyJobs?.length ? (
            datagetMyJobs?.map((job) => {
              return (
                <Jobcard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                  isMyJob
                />
              );
            })
          ) : (
            <div className="col-span-full flex justify-center items-center text-2xl">
              <h1>No Jobs Found</h1>
            </div>
          )}
        </div>
    </div>
  )
}

export default CreatedJobs

import { getSavedJobs } from '@/api/apiJobs';
import React,{ useEffect} from 'react'
import useFetch from '@/hooks/useFetch';
import { DotLoader } from "react-spinners"
import { useUser } from '@clerk/clerk-react';
import Jobcard from '@/components/Jobcard';

function SavedJobs() {

  const { isLoaded } = useUser();

  const {
    fn: fnsavedJobs,
    data: savedJobs,
    loading: loadingsavedJobs,
    error,
  } = useFetch(getSavedJobs);

  useEffect(() => {
      if (isLoaded) fnsavedJobs();
    }, [isLoaded]);

  if (!isLoaded || loadingsavedJobs) {
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
        Saved Jobs
      </h1>
      {loadingsavedJobs === false && (
        <div className="mt-6 sm:mt-12 px-4 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs?.length ? (
            savedJobs?.map((savedjob) => {
              return (
                <Jobcard
                  key={savedjob?.id}
                  job={savedjob?.job}
                  savedInit={true}
                  onJobSaved={fnsavedJobs}
                />
              );
            })
          ) : (
            <div className="col-span-full flex justify-center items-center text-2xl">
              <h1>No Saved Jobs Found</h1>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SavedJobs

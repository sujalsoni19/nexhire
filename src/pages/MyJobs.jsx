import { useUser } from '@clerk/clerk-react'
import React from 'react'
import CreatedApplications from '@/components/CreatedApplications';
import CreatedJobs from '@/components/CreatedJobs';

function MyJobs() {

  const { user, isLoaded } = useUser();

  if (!isLoaded ) {
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
              dark:from-slate-100 dark:via-slate-300 dark:to-slate-500 pb-2"
      >
        {user?.unsafeMetadata?.role === "candidate"
        ? "My Applications"
        : "My Jobs" }
      </h1>
      <div className='w-full'>
          {user?.unsafeMetadata?.role === "candidate"
        ? (<CreatedApplications />)
        : (<CreatedJobs />) }
      </div>
      
    </div>
  )
}

export default MyJobs

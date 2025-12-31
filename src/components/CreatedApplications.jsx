import React, { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { DotLoader } from "react-spinners";
import { useUser } from "@clerk/clerk-react";
import ApplicationCard from "./ApplicationCard";
import { getApplications } from "@/api/apiApplications";

function CreatedApplications() {
  const { user } = useUser();

  const {
    fn: fngetApplications,
    data: datagetApplications,
    loading: loadinggetApplications,
  } = useFetch(getApplications, {
    user_id: user.id,
  });

  useEffect(() => {
    fngetApplications();
  }, []);

  if (loadinggetApplications) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <DotLoader color="blue" />
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-3 px-4 sm:px-10 py-2">
      {datagetApplications?.length ? (
        datagetApplications?.map((application) => {
        return (
          <ApplicationCard
            key={application.id}
            application={application}
            isCandidate
          />
        );
      })
      ) : (
        <div className="col-span-full flex justify-center items-center text-2xl">
              <h1>No Applications Found</h1>
            </div>
      ) }
    </div>
  );
}

export default CreatedApplications;

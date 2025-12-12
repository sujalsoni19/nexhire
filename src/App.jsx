import { Button } from "@/components/ui/button";
import "./App.css";
import {
  AppLayout,
  JobListing,
  Jobpage,
  LandingPage,
  MyJobs,
  Onboarding,
  PostJob,
  SavedJobs,
} from "../src/pages";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/jobs",
        element: <JobListing />,
      },
      {
        path: "/job/:id",
        element: <Jobpage />,
      },
      {
        path: "/post-job",
        element: <PostJob />,
      },
      {
        path: "/saved-job",
        element: <SavedJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}>
      <div>
        <AppLayout />
        <main>
          <Outlet />
        </main>
      </div>
    </RouterProvider>
  );
}

export default App;

import { auth } from "@clerk/nextjs/server";
import IntroPage from "./intro-page";
import NewDocument from "./new-document";
import RecentDocument from "./recent-document";
import { Suspense } from "react";
import { Loader } from "lucide-react";

const Dashboard = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <IntroPage />;
  }
  return (
    <div>
      <Suspense
        fallback={
          <Loader className="flex justify-center items-center h-screen animate-spin" />
        }
      >
        <NewDocument />
      </Suspense>

      <Suspense
        fallback={
          <Loader className="flex justify-center items-center h-screen animate-spin" />
        }
      >
        <RecentDocument />
      </Suspense>
    </div>
  );
};

export default Dashboard;

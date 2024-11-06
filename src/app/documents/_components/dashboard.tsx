import { auth } from "@clerk/nextjs/server";
import IntroPage from "./intro-page";
import NewDocument from "./new-document";
import RecentDocument from "./recent-document";

const Dashboard = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <IntroPage />;
  }
  return (
    <div>
      <NewDocument />
      <RecentDocument />
    </div>
  );
};

export default Dashboard;

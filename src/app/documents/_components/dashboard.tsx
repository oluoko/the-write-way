import { auth } from "@clerk/nextjs/server";
import IntroPage from "./intro-page";
import NewDocument from "./new-document";

const Dashboard = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <IntroPage />;
  }
  return (
    <div>
      <NewDocument />
    </div>
  );
};

export default Dashboard;

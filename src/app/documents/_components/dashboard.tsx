import { auth } from "@clerk/nextjs/server";
import IntroPage from "./intro-page";

const Dashboard = async () => {
  const { userId } = await auth();

  if (!userId) {
    return <IntroPage />;
  }
  return <div></div>;
};

export default Dashboard;

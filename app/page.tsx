import getCurrentUser from "@/actions/getCurrentUser";
import GuestHomePage from "./GuestHomePage";
import DashboardHomePage from "./DashboardHomePage";

export default async function Home() {
  const currentUser = await getCurrentUser();

  // If user is logged in, show dashboard
  if (currentUser) {
    return <DashboardHomePage currentUser={currentUser} />;
  }

  // If user is NOT logged in, show guest landing page
  return <GuestHomePage />;
}
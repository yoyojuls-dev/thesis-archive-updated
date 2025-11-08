import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

const AdminPage = async () => {
  const currentUser = await getCurrentUser();

  // Redirect if not authenticated
  if (!currentUser) {
    redirect("/login?type=admin");
  }

  // Redirect if not admin - THIS IS THE KEY CHECK
  if (currentUser.role !== "ADMIN") {
    redirect("/"); // Redirect students back to main page
  }

  return <AdminDashboard currentUser={currentUser} />;
};

export default AdminPage;
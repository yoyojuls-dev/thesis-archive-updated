import getCurrentUser from "@/actions/getCurrentUser";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

const AdminPage = async () => {
  const currentUser = await getCurrentUser();

  // Redirect if not authenticated or not admin
  if (!currentUser) {
    redirect("/login");
  }

  if (currentUser.role !== "ADMIN") {
    redirect("/");
  }

  return <AdminDashboard currentUser={currentUser} />;
};

export default AdminPage;
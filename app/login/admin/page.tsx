import getCurrentUser from "@/actions/getCurrentUser";
import AdminLoginForm from "./AdminLoginForm";
import { redirect } from "next/navigation";

const AdminLogin = async () => {
  const currentUser = await getCurrentUser();
  
  // If already logged in, redirect based on role
  if (currentUser) {
    if (currentUser.role === 'ADMIN') {
      redirect("/admin");
    } else {
      redirect("/");
    }
  }
  
  return (
    <div className="min-h-screen">
      <AdminLoginForm />
    </div>
  );
};

export default AdminLogin;
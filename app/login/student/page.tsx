import getCurrentUser from "@/actions/getCurrentUser";
import StudentLoginForm from "./StudentLoginForm";
import { redirect } from "next/navigation";

const StudentLogin = async () => {
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
      <StudentLoginForm />
    </div>
  );
};

export default StudentLogin;
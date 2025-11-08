import getCurrentUser from "@/actions/getCurrentUser";
import RegisterForm from "./RegisterForm";

const Register = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="min-h-screen">
      <RegisterForm currentUser={currentUser} />
    </div>
  );
};

export default Register;
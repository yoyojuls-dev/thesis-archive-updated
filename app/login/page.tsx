import getCurrentUser from "@/actions/getCurrentUser";
import LoginForm from "./LoginForm";

const Login = async () => {
  const currentUser = await getCurrentUser();
  
  return (
    <div className="min-h-screen">
      <LoginForm currentUser={currentUser} />
      
    </div>
  );
};

export default Login;
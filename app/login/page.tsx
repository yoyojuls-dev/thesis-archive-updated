import { Suspense } from 'react';
import LoginForm from './LoginForm';
import getCurrentUser from '@/actions/getCurrentUser';

export default async function LoginPage() {
  const currentUser = await getCurrentUser();
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm currentUser={currentUser} />
    </Suspense>
  );
}
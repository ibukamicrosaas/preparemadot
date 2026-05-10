import { Suspense } from 'react';
import LoginForm from './LoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-bordeaux-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-serif text-or text-3xl font-semibold">Prepare Ma Dot</h1>
          <p className="text-beige/50 text-sm mt-1">Back-office administrateur</p>
        </div>
        <div className="bg-ivoire rounded-3xl p-8 shadow-2xl">
          <h2 className="font-serif text-bordeaux-dark text-xl font-semibold mb-6">Connexion</h2>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

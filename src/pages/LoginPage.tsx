import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { loginGoogle } = useAuthStore();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    const success = await loginGoogle(credentialResponse.credential);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F0F9FF]">
      <div className="p-8 bg-white rounded-3xl border-4 border-gray-200 shadow-sm text-center">
        <h1 className="text-2xl font-black text-gray-800 mb-6">Welcome to VOCAB-UP</h1>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => console.error('Login Failed')}
        />
      </div>
    </div>
  );
}

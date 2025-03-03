import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Leaf, CheckCircle, XCircle } from 'lucide-react';

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { verifyEmail } = useAuthStore();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setError('Verification token is missing');
      setVerifying(false);
      return;
    }

    verifyEmail(token)
      .then(() => {
        setVerifying(false);
        // Redirect to login after 3 seconds
        setTimeout(() => navigate('/login'), 3000);
      })
      .catch((err) => {
        setError(err.message);
        setVerifying(false);
      });
  }, [searchParams, verifyEmail, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Leaf className="h-12 w-12 text-green-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Email Verification
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {verifying ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto" />
              <p className="mt-4 text-red-600">{error}</p>
              <button
                onClick={() => navigate('/login')}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <p className="mt-4 text-green-600">Email verified successfully!</p>
              <p className="mt-2 text-gray-500">Redirecting to login...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
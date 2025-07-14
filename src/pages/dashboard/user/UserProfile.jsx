import React from 'react';
import { useAuth } from '../../../context/Provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../../hooks/useRole'; // make sure this exists

const UserProfile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { role, isLoading: loadingRole } = useRole();

  if (loading || loadingRole) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  const registrationDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 transition-colors duration-300">
      <Helmet>
        <title>My Profile | ActiveArena</title>
      </Helmet>

      <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 text-center">
          👤 My Profile
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={user?.photoURL || 'https://i.ibb.co/5r5C1fJ/user.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500 dark:border-blue-400 shadow-md object-cover"
            />
            <span className="absolute -bottom-2 right-0 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm font-semibold">
              {role || 'User'}
            </span>
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </h2>
              <p className="text-xl font-semibold text-blue-700 dark:text-blue-300">
                {user?.displayName || 'Anonymous User'}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                {user?.email || 'N/A'}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Registration Date
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-400">
                {registrationDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

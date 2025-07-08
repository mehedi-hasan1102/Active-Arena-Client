import React from 'react';
import { useAuth } from '../../../context/Provider/AuthProvider';

const UserProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-2xl font-bold">My Profile</h1>
      <div className="mt-4">
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Registration Date:</strong> {user?.metadata?.creationTime}</p>
      </div>
    </div>
  );
};

export default UserProfile;

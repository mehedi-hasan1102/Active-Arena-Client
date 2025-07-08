import React from 'react';
import { useAuth } from '../../../context/Provider/AuthProvider';

const AdminProfile = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-2xl font-bold">Admin Profile</h1>
      <div className="mt-4">
        <p><strong>Name:</strong> {user?.displayName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <h2 className="text-lg font-bold">Total Courts</h2>
          <p className="text-3xl">10</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <h2 className="text-lg font-bold">Total Users</h2>
          <p className="text-3xl">150</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <h2 className="text-lg font-bold">Total Members</h2>
          <p className="text-3xl">50</p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

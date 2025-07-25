import React, { useState, useEffect } from 'react';
import Loading from '../../../components/Loading';
import axiosInstance from '../../../api/axiosInstance';

const ManageAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance.get('/users')
      .then((res) => {
        setUsers(res.data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load users:', err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 p-6 sm:p-10 text-gray-800 dark:text-gray-200">
     
<h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
  Manage All Users
</h1>

      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-blue-600"
          aria-label="Search users by name or email"
        />
      </div>

      {loading ? (
       < Loading />
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <table
            className="min-w-full text-gray-900 dark:text-gray-200 text-sm"
            aria-label="Users table"
          >
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 uppercase text-xs select-none rounded-t-md">
              <tr>
                <th className="py-4 px-6 text-left rounded-tl-md font-semibold">Name</th>
                <th className="py-4 px-6 text-left font-semibold">Email</th>
                <th className="py-4 px-6 text-left rounded-tr-md font-semibold">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="py-4 px-6 text-center font-medium">{user.name}</td>
                    <td className="py-4 px-6 text-center">{user.email}</td>
                    <td className="py-4 px-6 text-center">{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-12 italic text-gray-500 dark:text-gray-400 font-medium"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageAllUsers;

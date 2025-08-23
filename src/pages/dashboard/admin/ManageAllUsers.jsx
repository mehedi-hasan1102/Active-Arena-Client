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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300  p-6 sm:p-10 text-emerald-600 dark:text-emerald-400">
     
<h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
  Manage All Users
</h1>

      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-md border border-emerald-300 dark:border-emerald-700z text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600 shadow-sm transition focus:outline-none focus:ring-4 focus:ring-emerald-500"
          aria-label="Search users by name or email"
        />
      </div>

      {loading ? (
       < Loading />
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-emerald-300 dark:border-emerald-700 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
          <table
            className="min-w-full text-emerald-600 dark:text-emerald-400 text-sm"
            aria-label="Users table"
          >
            <thead className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 text-emerald-600 dark:text-emerald-400 uppercase text-xs select-none rounded-t-md">
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
                    className="border-b border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-zinc-900 transition-colors"
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
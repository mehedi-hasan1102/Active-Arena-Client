
import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get("http://localhost:5000/users");
      const onlyMembers = res.data.users.filter((user) => user.role === "member");
      setMembers(onlyMembers);
    } catch {
      setError("Failed to load members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      alert("Member deleted!");
      fetchMembers();
    } catch {
      alert("Failed to delete member");
    }
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center py-10 text-lg dark:text-gray-300">🔄 Loading members...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 dark:text-red-400">❌ {error}</div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 min-h-screen transition-colors duration-300 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">👥 Manage Members</h1>

      {/* Search */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg bg-white dark:bg-gray-800 p-4">
        <table className="min-w-full text-sm text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-t-md">
          <thead className="bg-gray-100 dark:bg-gray-800 uppercase text-xs text-gray-600 dark:text-gray-200">
            <tr>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-left">Name</th>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-left">Email</th>
              <th className="py-3 px-4 border-b border-gray-300 dark:border-gray-700 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No members found.
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr
                  key={member._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-300 dark:border-gray-700"
                >
                  <td className="py-3 px-4">{member.name}</td>
                  <td className="py-3 px-4">{member.email}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;

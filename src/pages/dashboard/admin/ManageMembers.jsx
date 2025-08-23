
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import Loading from "../../../components/Loading";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axiosInstance.get("/users");
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
      await axiosInstance.delete(`/users/${id}`);
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
     < Loading />
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500 dark:text-red-400">❌ {error}</div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-300 text-emerald-600 dark:text-emerald-400">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center"> Manage Members</h1>

      {/* Search */}
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 rounded-md border border-emerald-300 dark:border-emerald-700 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md border border-emerald-200 dark:border-emerald-700 overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold">
            <tr>
              <th className="py-3 px-4 border-b border-emerald-300 dark:border-emerald-700 text-left">Name</th>
              <th className="py-3 px-4 border-b border-emerald-300 dark:border-emerald-700 text-left">Email</th>
              <th className="py-3 px-4 border-b border-emerald-300 dark:border-emerald-700 text-center">Actions</th>
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
                  className="even:bg-emerald-50 dark:even:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-700 transition-colors"
                >
                  <td className="py-3 px-4">{member.name}</td>
                  <td className="py-3 px-4">{member.email}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:bg-red-700 dark:hover:bg-red-800 dark:text-gray-200"
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

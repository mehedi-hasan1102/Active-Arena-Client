
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ManageMembers = () => {
//   const [members, setMembers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Fetch members from backend
//   const fetchMembers = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await axios.get("http://localhost:5000/users");
//       // Filter only members role
//       const onlyMembers = res.data.users.filter((user) => user.role === "member");
//       setMembers(onlyMembers);
//     } catch {
//       setError("Failed to load members");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this member?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/users/${id}`);
//       alert("Member deleted!");
//       fetchMembers(); // refresh list
//     } catch {
//       alert("Failed to delete member");
//     }
//   };

//   const filteredMembers = members.filter((member) =>
//     member.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading)
//     return <p className="text-center py-10">Loading members...</p>;
//   if (error)
//     return <p className="text-center py-10 text-red-500">{error}</p>;

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Manage Members</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by name..."
//           className="p-2 border rounded w-full"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Name</th>
//               <th className="py-2 px-4 border-b">Email</th>
//               <th className="py-2 px-4 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredMembers.length === 0 ? (
//               <tr>
//                 <td colSpan="3" className="text-center py-6 text-gray-500">
//                   No members found.
//                 </td>
//               </tr>
//             ) : (
//               filteredMembers.map((member) => (
//                 <tr key={member._id} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border-b text-center">{member.name}</td>
//                   <td className="py-2 px-4 border-b text-center">{member.email}</td>
//                   <td className="py-2 px-4 border-b text-center">
//                     <button
//                       onClick={() => handleDelete(member._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageMembers;
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

  if (loading) return <p className="text-center py-10">Loading members...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Manage Members</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 text-left">
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Name</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Email</th>
              <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Actions</th>
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
                <tr key={member._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">{member.name}</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">{member.email}</td>
                  <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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

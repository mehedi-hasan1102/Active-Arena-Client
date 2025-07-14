
// import React, { useState, useEffect } from 'react';

// const ManageAllUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:5000/users')
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data.users || []); // default to [] if undefined
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Failed to load users:', err);
//         setLoading(false);
//       });
//   }, []);

//   const filteredUsers = users.filter((user) =>
//     user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     user.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Manage All Users</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           className="p-2 border rounded w-full"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {loading ? (
//         <p className="text-center">Loading users...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Email</th>
//                 <th className="py-2 px-4 border-b">Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user) => (
//                   <tr key={user._id} className="hover:bg-gray-50">
//                     <td className="py-2 px-4 border-b text-center">{user.name}</td>
//                     <td className="py-2 px-4 border-b text-center">{user.email}</td>
//                     <td className="py-2 px-4 border-b text-center">{user.role}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="text-center py-4 text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
          
//         </div>
//       )}
//     </div>
    
//   );
// };

// export default ManageAllUsers;
import React, { useState, useEffect } from 'react';

const ManageAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load users:', err);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-bold mb-4">Manage All Users</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="p-2 border border-gray-300 dark:border-gray-600 rounded w-full bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Name</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Email</th>
                <th className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                      {user.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                      {user.email}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-center">
                      {user.role}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500 dark:text-gray-400">
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

import React from 'react';

const ManageMembers = () => {
  // Mock data
  const members = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Manage Members</h1>
      <div className="mt-4">
        <input type="text" placeholder="Search by name..." className="p-2 border rounded w-full" />
      </div>
      <div className="mt-4">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td className="border px-4 py-2">{member.name}</td>
                <td className="border px-4 py-2">{member.email}</td>
                <td className="border px-4 py-2">
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageMembers;

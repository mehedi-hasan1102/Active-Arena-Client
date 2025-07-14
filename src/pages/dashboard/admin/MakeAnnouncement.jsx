// import React, { useState } from 'react';

// const MakeAnnouncement = () => {
//   const [announcements, setAnnouncements] = useState([
//     { id: 1, title: 'Court Maintenance', content: 'Court 2 will be under maintenance on July 15th.' },
//     { id: 2, title: 'New Member Discount', content: 'Enjoy 10% off your first booking as a new member!' },
//   ]);
//   const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
//   const [editingAnnouncement, setEditingAnnouncement] = useState(null);

//   const handleAddAnnouncement = (e) => {
//     e.preventDefault();
//     if (newAnnouncement.title && newAnnouncement.content) {
//       setAnnouncements([...announcements, { ...newAnnouncement, id: announcements.length + 1 }]);
//       setNewAnnouncement({ title: '', content: '' });
//     }
//   };

//   const handleUpdateAnnouncement = (e) => {
//     e.preventDefault();
//     setAnnouncements(announcements.map(announcement =>
//       announcement.id === editingAnnouncement.id ? editingAnnouncement : announcement
//     ));
//     setEditingAnnouncement(null);
//   };

//   const handleDeleteAnnouncement = (id) => {
//     setAnnouncements(announcements.filter(announcement => announcement.id !== id));
//     alert(`Announcement ${id} deleted!`);
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Make Announcement</h1>

//       <div className="mb-8 p-4 border rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">{editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}</h2>
//         <form onSubmit={editingAnnouncement ? handleUpdateAnnouncement : handleAddAnnouncement} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Title</label>
//             <input
//               type="text"
//               className="mt-1 p-2 border rounded w-full"
//               value={editingAnnouncement ? editingAnnouncement.title : newAnnouncement.title}
//               onChange={(e) => editingAnnouncement ? setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value }) : setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Content</label>
//             <textarea
//               className="mt-1 p-2 border rounded w-full h-24"
//               value={editingAnnouncement ? editingAnnouncement.content : newAnnouncement.content}
//               onChange={(e) => editingAnnouncement ? setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value }) : setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
//               required
//             ></textarea>
//           </div>
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//             {editingAnnouncement ? 'Update Announcement' : 'Add Announcement'}
//           </button>
//           {editingAnnouncement && (
//             <button type="button" onClick={() => setEditingAnnouncement(null)} className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
//               Cancel
//             </button>
//           )}
//         </form>
//       </div>

//       <h2 className="text-xl font-semibold mb-4">Existing Announcements</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Title</th>
//               <th className="py-2 px-4 border-b">Content</th>
//               <th className="py-2 px-4 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {announcements.map((announcement) => (
//               <tr key={announcement.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b text-center">{announcement.title}</td>
//                 <td className="py-2 px-4 border-b text-center">{announcement.content}</td>
//                 <td className="py-2 px-4 border-b text-center">
//                   <button
//                     onClick={() => setEditingAnnouncement(announcement)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded mr-2 hover:bg-yellow-600"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteAnnouncement(announcement.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MakeAnnouncement;
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosInstance from '../../../api/axiosInstance';

const MakeAnnouncement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  // Fetch announcements
  const { data: announcements = [], isLoading, error } = useQuery({
    queryKey: ['announcements', searchTerm],
    queryFn: async () => {
      const res = await axiosInstance.get('/announcements', {
        params: { title: searchTerm || undefined },
      });
      return res.data.announcements || [];
    },
  });

  // Add announcement mutation
  const addAnnouncementMutation = useMutation({
    mutationFn: async (announcement) => {
      const res = await axiosInstance.post('/announcements', announcement);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('✅ Success', 'Announcement added successfully!', 'success');
      queryClient.invalidateQueries(['announcements']);
      setNewAnnouncement({ title: '', content: '' });
      setIsAddModalOpen(false);
    },
    onError: (error) => {
      Swal.fire('❌ Error', error.response?.data?.error || 'Could not add announcement', 'error');
    },
  });

  // Update announcement mutation
  const updateAnnouncementMutation = useMutation({
    mutationFn: async ({ id, announcement }) => {
      const res = await axiosInstance.put(`/announcements/${id}`, announcement);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('✅ Success', 'Announcement updated successfully!', 'success');
      queryClient.invalidateQueries(['announcements']);
      setEditingAnnouncement(null);
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      Swal.fire('❌ Error', error.response?.data?.error || 'Could not update announcement', 'error');
    },
  });

  // Delete announcement mutation
  const deleteAnnouncementMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosInstance.delete(`/announcements/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire('✅ Success', 'Announcement deleted successfully!', 'success');
      queryClient.invalidateQueries(['announcements']);
    },
    onError: (error) => {
      Swal.fire('❌ Error', error.response?.data?.error || 'Could not delete announcement', 'error');
    },
  });

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (newAnnouncement.title && newAnnouncement.content) {
      addAnnouncementMutation.mutate({
        title: newAnnouncement.title,
        content: newAnnouncement.content,
      });
    } else {
      Swal.fire('❌ Error', 'Please fill in all required fields', 'error');
    }
  };

  const handleUpdateAnnouncement = (e) => {
    e.preventDefault();
    if (editingAnnouncement.title && editingAnnouncement.content) {
      updateAnnouncementMutation.mutate({
        id: editingAnnouncement._id,
        announcement: {
          title: editingAnnouncement.title,
          content: editingAnnouncement.content,
        },
      });
    } else {
      Swal.fire('❌ Error', 'Please fill in all required fields', 'error');
    }
  };

  const handleDeleteAnnouncement = (announcement) => {
    Swal.fire({
      title: 'Confirm Deletion',
      text: `Are you sure you want to delete the announcement "${announcement.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAnnouncementMutation.mutate(announcement._id);
      }
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isLoading)
    return (
      <div className="text-center py-10 text-lg dark:text-gray-300" role="status">
        🔄 Loading announcements...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 dark:text-red-400 text-center py-10" role="alert">
        ❌ Failed to load announcements: {error.response?.data?.error || error.message}
      </div>
    );

  return (
    <div className="p-4 sm:p-6 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        📢 Make Announcement
      </h1>

      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by announcement title..."
          className="w-full max-w-md p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Search announcements by title"
        />
      </div>

      {/* Add Announcement Button */}
      <div className="mb-6">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded transition"
        >
          ➕ Add New Announcement
        </button>
      </div>

      {/* Add Announcement Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              ➕ Add New Announcement
            </h2>
            <form onSubmit={handleAddAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Content
                </label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={addAnnouncementMutation.isLoading}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50"
                >
                  Add Announcement
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Announcement Modal */}
      {isEditModalOpen && editingAnnouncement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              ✏️ Edit Announcement
            </h2>
            <form onSubmit={handleUpdateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={editingAnnouncement.title}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Content
                </label>
                <textarea
                  value={editingAnnouncement.content}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 h-24"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={updateAnnouncementMutation.isLoading}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50"
                >
                  Update Announcement
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcement Table */}
      <div className="overflow-x-auto shadow rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <table className="min-w-full text-sm text-gray-700 dark:text-gray-300" aria-label="Announcements table">
          <thead className="bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-700 dark:to-purple-800 text-gray-600 dark:text-gray-200 uppercase text-xs">
            <tr>
              <th className="py-3 px-4 text-left" scope="col">Title</th>
              <th className="py-3 px-4 text-left" scope="col">Content</th>
              <th className="py-3 px-4 text-center" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No announcements available.
                </td>
              </tr>
            ) : (
              announcements.map((announcement) => (
                <tr
                  key={announcement._id}
                  className="hover:bg-purple-50 dark:hover:bg-purple-900 border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4">{announcement.title}</td>
                  <td className="py-3 px-4">{announcement.content}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingAnnouncement(announcement);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition"
                        aria-label={`Edit announcement ${announcement.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                        aria-label={`Delete announcement ${announcement.title}`}
                      >
                        Delete
                      </button>
                    </div>
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

export default MakeAnnouncement;
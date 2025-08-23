
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import axiosInstance from '../../../api/axiosInstance';
import Loading from '../../../components/Loading';

const MakeAnnouncement = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  const { data: announcements = [], isLoading, error } = useQuery({
    queryKey: ['announcements', searchTerm],
    queryFn: async () => {
      const res = await axiosInstance.get('/announcements', {
        params: { title: searchTerm || undefined },
      });
      return res.data.announcements || [];
    },
  });

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
      background: document.documentElement.classList.contains('dark') ? '#18181b' : '#fff',
      color: document.documentElement.classList.contains('dark') ? '#e4e4e7' : '#111827',
      confirmButtonColor: '#059669',
      cancelButtonColor: '#d33',
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
     < Loading />
    );
  if (error)
    return (
      <div className="text-red-600 dark:text-red-400 text-center py-12 font-semibold" role="alert">
        ❌ Failed to load announcements: {error.response?.data?.error || error.message}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300  text-emerald-600 dark:text-emerald-400 p-6 sm:p-10">
      

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
   Make Announcement</h1>
      {/* Search Bar */}
      <div className="mb-8 max-w-lg mx-auto">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search announcements by title..."
          aria-label="Search announcements by title"
          className="w-full p-3 rounded-md border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600 shadow-sm transition focus:ring-4 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      {/* Add Announcement Button */}
      <div className="mb-10 flex justify-center">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:from-emerald-400 dark:to-cyan-400 dark:hover:from-emerald-500 dark:hover:to-cyan-500 dark:text-gray-900 transform hover:scale-[1.05]"
          aria-label="Add new announcement"
        >
          ➕ Add New Announcement
        </button>
      </div>

      {/* Add Announcement Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-xl w-full max-w-md animate-slideInUp">
            <h2 className="text-2xl font-semibold mb-6 text-emerald-600 dark:text-emerald-400">➕ Add New Announcement</h2>
            <form onSubmit={handleAddAnnouncement} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">Title</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="w-full p-3 border border-emerald-300 dark:border-emerald-700 rounded-md bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500 transition"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">Content</label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  className="w-full p-3 border border-emerald-300 dark:border-emerald-700 rounded-md bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500 transition h-28 resize-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  disabled={addAnnouncementMutation.isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:from-emerald-400 dark:to-cyan-400 dark:hover:from-emerald-500 dark:hover:to-cyan-500 dark:text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Add Announcement
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-200"
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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-xl w-full max-w-md animate-slideInUp">
            <h2 className="text-2xl font-semibold mb-6 text-emerald-600 dark:text-emerald-400">✏️ Edit Announcement</h2>
            <form onSubmit={handleUpdateAnnouncement} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">Title</label>
                <input
                  type="text"
                  value={editingAnnouncement.title}
                  onChange={(e) =>
                    setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })
                  }
                  className="w-full p-3 border border-emerald-300 dark:border-emerald-700 rounded-md bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500 transition"
                  required
                  autoFocus
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">Content</label>
                <textarea
                  value={editingAnnouncement.content}
                  onChange={(e) =>
                    setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })
                  }
                  className="w-full p-3 border border-emerald-300 dark:border-emerald-700 rounded-md bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 placeholder-emerald-400 dark:placeholder-emerald-600 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500 transition h-28 resize-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  disabled={updateAnnouncementMutation.isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:from-emerald-400 dark:to-cyan-400 dark:hover:from-emerald-500 dark:hover:to-cyan-500 dark:text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Update Announcement
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Announcement Table */}
      <div className="overflow-x-auto shadow-lg rounded-lg border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-zinc-900">
        <table
          className="min-w-full text-emerald-600 dark:text-emerald-400 text-sm"
          aria-label="Announcements table"
        >
          <thead className="bg-emerald-50 dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 uppercase text-xs select-none">
            <tr>
              <th className="py-4 px-6 text-left rounded-tl-lg font-semibold">Title</th>
              <th className="py-4 px-6 text-left font-semibold">Content</th>
              <th className="py-4 px-6 text-center rounded-tr-lg font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {announcements.length === 0 ? (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-12 text-gray-500 dark:text-gray-400 italic font-medium"
                >
                  No announcements available.
                </td>
              </tr>
            ) : (
              announcements.map((announcement) => (
                <tr
                  key={announcement._id}
                  className="border-b border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <td className="py-4 px-6 font-medium">{announcement.title}</td>
                  <td className="py-4 px-6 whitespace-pre-wrap">{announcement.content}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => {
                          setEditingAnnouncement(announcement);
                          setIsEditModalOpen(true);
                        }}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-gray-200"
                        aria-label={`Edit announcement ${announcement.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
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

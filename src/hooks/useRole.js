// import { useAuth } from '../context/Provider/AuthProvider';

// // This is a mock implementation of a useRole hook.
// // In a real application, the user's role should be determined by a custom claim in their JWT,
// // or by fetching their role from your database after they log in.

// export const useRole = () => {
//   const { user } = useAuth();

//   // Mocking role based on email for demonstration.
//   // Replace this with your actual role logic.
//   const adminEmails = ['admin@activearena.com'];
//   const memberEmails = ['member@activearena.com'];

//   if (adminEmails.includes(user?.email)) {
//     return { role: 'admin', isLoading: false };
//   }

//   if (memberEmails.includes(user?.email)) {
//     return { role: 'member', isLoading: false };
//   }

//   // Default to 'user' if not an admin or member, or if the user is not logged in.
//   return { role: 'user', isLoading: false };
// };
import { useAuth } from '../context/Provider/AuthProvider';
import { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';

export const useRole = () => {
  const { user, loading: authLoading } = useAuth();
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user?.email || authLoading) {
      setRole('user'); // default role when no user logged in
      setIsLoading(false);
      return;
    }

    const fetchUserRole = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/users?email=${user.email}`);
        // Assuming your backend supports filtering by email query param
        // Or you can fetch all users and filter client-side (not ideal)
        // Let's say the backend returns { users: [...] }

        const foundUser = response.data.users.find(u => u.email === user.email);
        setRole(foundUser?.role || 'user');
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        setRole('user'); // fallback role on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.email, authLoading]);

  return { role, isLoading };
};

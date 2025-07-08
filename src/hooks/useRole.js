import { useAuth } from '../context/Provider/AuthProvider';

// This is a mock implementation of a useRole hook.
// In a real application, the user's role should be determined by a custom claim in their JWT,
// or by fetching their role from your database after they log in.

export const useRole = () => {
  const { user } = useAuth();

  // Mocking role based on email for demonstration.
  // Replace this with your actual role logic.
  const adminEmails = ['admin@activearena.com'];
  const memberEmails = ['member@activearena.com'];

  if (adminEmails.includes(user?.email)) {
    return { role: 'admin', isLoading: false };
  }

  if (memberEmails.includes(user?.email)) {
    return { role: 'member', isLoading: false };
  }

  // Default to 'user' if not an admin or member, or if the user is not logged in.
  return { role: 'user', isLoading: false };
};

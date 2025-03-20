export const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1, // Try at least thrice before giving up
      staleTime: Infinity, // Idempotent to user session.
      // cacheTime: Infinity, // Idempotent to user session.
      refetchOnWindowFocus: false, // Query will not be refetched on window focus
    },
    mutations: {
      retry: 1, // Try at least thrice before giving up
    },
  },
};

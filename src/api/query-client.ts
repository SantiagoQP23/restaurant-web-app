import { QueryClient } from '@tanstack/react-query';

/**
 * QueryClient configuration for React Query v5
 *
 * Default configuration:
 * - staleTime: 60s - Data is fresh for 1 minute
 * - gcTime: 5 minutes - Unused data is garbage collected after 5 minutes (renamed from cacheTime)
 * - retry: 1 - Retry failed queries once
 * - refetchOnWindowFocus: false - Don't refetch when window regains focus (better UX for restaurant app)
 *
 * @version 2.0 2025-01-01 - Updated for React Query v5
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      gcTime: 1000 * 60 * 5, // 5 minutes (was cacheTime in v4)
      retry: 1,
      refetchOnWindowFocus: false
    },
    mutations: {
      retry: 0 // Don't retry mutations by default
    }
  }
});

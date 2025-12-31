/**
 * Centralized Query Key Factory for React Query v5
 *
 * This provides type-safe, consistent query keys across the application.
 * Using a factory pattern prevents cache invalidation bugs and makes refactoring easier.
 *
 * @author Migration to React Query v5
 * @version 1.0 2025-01-01
 */

// User filters and params types
export interface UserFilters {
  offset?: number;
  limit?: number;
  search?: string;
}

export interface TableFilters {
  // Add table-specific filters if needed
}

export interface MenuFilters {
  restaurantId?: string;
}

export interface ProductFilters {
  // Add product-specific filters if needed
}

export interface OrderFilters {
  // Add order-specific filters if needed
}

/**
 * Query Keys Factory
 * Use these throughout the app for consistent cache keys
 */
export const queryKeys = {
  // Users module
  users: {
    all: ['users'] as const,
    lists: () => ['users', 'list'] as const,
    list: (filters: UserFilters) => ['users', 'list', filters] as const,
    suggestions: (search: string) => ['users-suggestions', search] as const,
    detail: (id: string) => ['user', id] as const
  },

  // Tables module
  tables: {
    all: ['tables'] as const,
    lists: () => ['tables', 'list'] as const,
    list: (filters?: TableFilters) => ['tables', 'list', filters] as const,
    detail: (id: string) => ['table', id] as const
  },

  // Menu module
  menu: {
    all: ['menu'] as const,
    detail: (restaurantId: string) => ['menu', restaurantId] as const
  },

  // Products module
  products: {
    all: ['products'] as const,
    lists: () => ['products', 'list'] as const,
    list: (filters?: ProductFilters) => ['products', 'list', filters] as const,
    detail: (id: string) => ['product', id] as const
  },

  // Categories module
  categories: {
    all: ['categories'] as const,
    lists: () => ['categories', 'list'] as const
  },

  // Sections module
  sections: {
    all: ['sections'] as const,
    lists: () => ['sections', 'list'] as const
  },

  // Orders module
  orders: {
    all: ['orders'] as const,
    lists: () => ['orders', 'list'] as const,
    actives: () => ['orders', 'actives'] as const,
    detail: (id: string) => ['order', id] as const
  },

  // Roles module
  roles: {
    all: ['roles'] as const
  }
} as const;

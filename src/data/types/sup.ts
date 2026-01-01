/**
 * SUP rental types
 */

export type SUPBoard = {
  id: string;
  name: string;
  description: string;
  pricePerHour: number;
  pricePerDay: number;
  currency: string;
  rating: number;
  imageUrl: string;
  category: "all-around" | "touring" | "racing" | "yoga" | "inflatable";
  available: boolean;
  locationId: string;
  features: string[];
  length?: string;
  width?: string;
  weight?: string;
  capacity?: string;
};

export type Location = {
  id: string;
  name: string;
  city: string;
  region: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  description: string;
  availableBoards: string[];
  operatingHours: {
    open: string;
    close: string;
  };
};

export type Booking = {
  id: string;
  boardId: string;
  locationId: string;
  userId?: string;
  startDate: string;
  endDate: string;
  duration: "hour" | "day" | "multi-day";
  totalPrice: number;
  currency: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
};

export type BookingRequest = {
  boardId: string;
  locationId: string;
  startDate: string;
  endDate: string;
  duration: "hour" | "day" | "multi-day";
};

export type SUPFilter = {
  locationId?: string;
  category?: SUPBoard["category"];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  available?: boolean;
  duration?: "hour" | "day";
};

export type SUPSort = "name" | "price" | "rating" | "popular";

export type SearchParams = {
  query: string;
  filters: SUPFilter;
  sort: SUPSort;
  page: number;
  limit: number;
};

/**
 * SUP rental context type
 */
export interface SUPContextType {
  /**
   * All available SUP boards
   */
  boards: SUPBoard[];
  /**
   * All available locations in Switzerland
   */
  locations: Location[];
  /**
   * Filtered and sorted boards
   */
  filteredBoards: SUPBoard[];
  /**
   * Current selected location
   */
  selectedLocation: Location | null;
  /**
   * Current search parameters
   */
  searchParams: SearchParams;
  /**
   * User's bookings
   */
  bookings: Booking[];
  /**
   * Whether data is loading
   */
  isLoading: boolean;
  /**
   * Any errors
   */
  error: Error | null;
  /**
   * Search boards
   */
  search: (query: string) => void;
  /**
   * Apply filters
   */
  setFilters: (filters: SUPFilter) => void;
  /**
   * Set sort order
   */
  setSort: (sort: SUPSort) => void;
  /**
   * Set selected location
   */
  setSelectedLocation: (location: Location | null) => void;
  /**
   * Create a booking
   */
  createBooking: (booking: BookingRequest) => Promise<Booking>;
  /**
   * Get bookings for a user
   */
  getBookings: (userId?: string) => Booking[];
  /**
   * Cancel a booking
   */
  cancelBooking: (bookingId: string) => Promise<void>;
  /**
   * Set page for pagination
   */
  setPage: (page: number) => void;
  /**
   * Clear any errors
   */
  clearError: () => void;
}


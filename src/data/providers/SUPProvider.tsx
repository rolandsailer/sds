import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { SUPContext } from "../contexts/SUPContext";
import { supService } from "../services/supService";
import {
  SUPBoard,
  Location,
  Booking,
  BookingRequest,
  SUPFilter,
  SUPSort,
  SearchParams,
} from "../types/sup";

/**
 * SUP rental provider with full state management
 */
export function SUPProvider({ children }: { children?: ReactNode }) {
  const [boards, setBoards] = useState<SUPBoard[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: "",
    filters: {},
    sort: "popular",
    page: 1,
    limit: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load boards and locations on mount
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        const [boardsData, locationsData] = await Promise.all([
          supService.getBoards(),
          supService.getLocations(),
        ]);
        setBoards(boardsData);
        setLocations(locationsData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Load persisted bookings from localStorage
  useEffect(() => {
    const storedBookings = localStorage.getItem("sup-bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    }
  }, []);

  // Persist bookings to localStorage
  useEffect(() => {
    localStorage.setItem("sup-bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Compute filtered boards
  const filteredBoards = useMemo(() => {
    let result = boards;

    // Apply location filter if selected
    if (selectedLocation) {
      result = result.filter(
        (board) => board.locationId === selectedLocation.id,
      );
    }

    // Apply search query
    if (searchParams.query) {
      result = supService.searchBoards(result, searchParams.query);
    }

    // Apply filters
    result = supService.filterBoards(result, searchParams.filters);

    // Apply sorting
    result = supService.sortBoards(result, searchParams.sort);

    return result;
  }, [boards, selectedLocation, searchParams]);

  const search = useCallback((query: string) => {
    setSearchParams((prev) => ({ ...prev, query, page: 1 }));
  }, []);

  const setFilters = useCallback((filters: SUPFilter) => {
    setSearchParams((prev) => ({ ...prev, filters, page: 1 }));
  }, []);

  const setSort = useCallback((sort: SUPSort) => {
    setSearchParams((prev) => ({ ...prev, sort, page: 1 }));
  }, []);

  const setPage = useCallback((page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
  }, []);

  const handleSetSelectedLocation = useCallback(
    (location: Location | null) => {
      setSelectedLocation(location);
      setSearchParams((prev) => {
        if (location) {
          return {
            ...prev,
            filters: { ...prev.filters, locationId: location.id },
          };
        } else {
          const { locationId, ...restFilters } = prev.filters;
          return { ...prev, filters: restFilters };
        }
      });
    },
    [],
  );

  const createBooking = useCallback(
    async (bookingRequest: BookingRequest): Promise<Booking> => {
      setIsLoading(true);
      setError(null);

      try {
        const newBooking = await supService.createBooking(bookingRequest);
        setBookings((prev) => [...prev, newBooking]);
        return newBooking;
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const getBookings = useCallback(
    (userId?: string): Booking[] => {
      if (userId) {
        return bookings.filter((booking) => booking.userId === userId);
      }
      return bookings;
    },
    [bookings],
  );

  const cancelBooking = useCallback(async (bookingId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      await supService.cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled" as const }
            : booking,
        ),
      );
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      boards,
      locations,
      filteredBoards,
      selectedLocation,
      searchParams,
      bookings,
      isLoading,
      error,
      search,
      setFilters,
      setSort,
      setSelectedLocation: handleSetSelectedLocation,
      createBooking,
      getBookings,
      cancelBooking,
      setPage,
      clearError,
    }),
    [
      boards,
      locations,
      filteredBoards,
      selectedLocation,
      searchParams,
      bookings,
      isLoading,
      error,
      search,
      setFilters,
      setSort,
      handleSetSelectedLocation,
      createBooking,
      getBookings,
      cancelBooking,
      setPage,
      clearError,
    ],
  );

  return <SUPContext.Provider value={value}>{children}</SUPContext.Provider>;
}


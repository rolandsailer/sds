import {
  SUPBoard,
  Location,
  Booking,
  BookingRequest,
  SUPFilter,
  SUPSort,
} from "../types/sup";

/**
 * SUP rental service with mock data for Switzerland
 */
export const supService = {
  /**
   * Get all SUP boards
   */
  async getBoards(): Promise<SUPBoard[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return [
      {
        id: "sup-1",
        name: "Red Paddle Co Explorer",
        description:
          "Premium inflatable touring board perfect for exploring Swiss lakes. Lightweight and easy to transport.",
        pricePerHour: 25,
        pricePerDay: 80,
        currency: "CHF",
        rating: 4.8,
        imageUrl: "https://picsum.photos/seed/SUP-Explorer/1200/900",
        category: "touring",
        available: true,
        locationId: "loc-zurich",
        features: ["Inflatable", "Lightweight", "Touring", "All skill levels"],
        length: "11'6\"",
        width: "32\"",
        weight: "12 kg",
        capacity: "Up to 120 kg",
      },
      {
        id: "sup-2",
        name: "Naish Maliko 14'",
        description:
          "High-performance racing board for experienced paddlers. Built for speed and stability on open water.",
        pricePerHour: 35,
        pricePerDay: 120,
        currency: "CHF",
        rating: 4.9,
        imageUrl: "https://picsum.photos/seed/SUP-Racing/1200/900",
        category: "racing",
        available: true,
        locationId: "loc-lucerne",
        features: ["Racing", "Fast", "Stable", "Advanced"],
        length: "14'",
        width: "28\"",
        weight: "14 kg",
        capacity: "Up to 100 kg",
      },
      {
        id: "sup-3",
        name: "Bote Breeze Aero",
        description:
          "Versatile all-around board ideal for beginners and families. Great for calm waters and recreational paddling.",
        pricePerHour: 20,
        pricePerDay: 65,
        currency: "CHF",
        rating: 4.6,
        imageUrl: "https://picsum.photos/seed/SUP-AllAround/1200/900",
        category: "all-around",
        available: true,
        locationId: "loc-geneva",
        features: ["All-around", "Stable", "Beginner-friendly", "Family"],
        length: "10'6\"",
        width: "34\"",
        weight: "11 kg",
        capacity: "Up to 150 kg",
      },
      {
        id: "sup-4",
        name: "Yoga SUP Pro",
        description:
          "Extra-wide yoga board with soft deck pad. Perfect for SUP yoga sessions on calm Swiss lakes.",
        pricePerHour: 30,
        pricePerDay: 100,
        currency: "CHF",
        rating: 4.7,
        imageUrl: "https://picsum.photos/seed/SUP-Yoga/1200/900",
        category: "yoga",
        available: true,
        locationId: "loc-zurich",
        features: ["Yoga", "Extra wide", "Soft deck", "Stable"],
        length: "11'",
        width: "36\"",
        weight: "13 kg",
        capacity: "Up to 130 kg",
      },
      {
        id: "sup-5",
        name: "Starboard Touring",
        description:
          "Premium touring board for long-distance paddling. Excellent for exploring multiple lakes in one day.",
        pricePerHour: 28,
        pricePerDay: 90,
        currency: "CHF",
        rating: 4.8,
        imageUrl: "https://picsum.photos/seed/SUP-Touring/1200/900",
        category: "touring",
        available: true,
        locationId: "loc-lucerne",
        features: ["Touring", "Long distance", "Comfortable", "Durable"],
        length: "12'6\"",
        width: "30\"",
        weight: "13 kg",
        capacity: "Up to 110 kg",
      },
      {
        id: "sup-6",
        name: "iRocker All-Around",
        description:
          "Affordable inflatable board perfect for beginners. Easy to inflate and great for family outings.",
        pricePerHour: 18,
        pricePerDay: 55,
        currency: "CHF",
        rating: 4.5,
        imageUrl: "https://picsum.photos/seed/SUP-iRocker/1200/900",
        category: "all-around",
        available: true,
        locationId: "loc-geneva",
        features: ["Inflatable", "Affordable", "Beginner", "Portable"],
        length: "10'",
        width: "32\"",
        weight: "10 kg",
        capacity: "Up to 140 kg",
      },
      {
        id: "sup-7",
        name: "SIC RS Air",
        description:
          "Lightweight racing board for competitive paddlers. Designed for speed and efficiency.",
        pricePerHour: 40,
        pricePerDay: 140,
        currency: "CHF",
        rating: 4.9,
        imageUrl: "https://picsum.photos/seed/SUP-RS-Air/1200/900",
        category: "racing",
        available: true,
        locationId: "loc-zurich",
        features: ["Racing", "Lightweight", "Competition", "Advanced"],
        length: "14'6\"",
        width: "26\"",
        weight: "11 kg",
        capacity: "Up to 90 kg",
      },
      {
        id: "sup-8",
        name: "BIC Sport Ace-Tec",
        description:
          "Durable all-around board suitable for all conditions. Great for exploring Swiss mountain lakes.",
        pricePerHour: 22,
        pricePerDay: 70,
        currency: "CHF",
        rating: 4.6,
        imageUrl: "https://picsum.photos/seed/SUP-Ace-Tec/1200/900",
        category: "all-around",
        available: true,
        locationId: "loc-lucerne",
        features: ["Durable", "All conditions", "Versatile", "Reliable"],
        length: "10'8\"",
        width: "33\"",
        weight: "12 kg",
        capacity: "Up to 125 kg",
      },
      {
        id: "sup-9",
        name: "Yoga SUP Deluxe",
        description:
          "Premium yoga board with extra stability and comfort. Perfect for sunrise yoga sessions.",
        pricePerHour: 32,
        pricePerDay: 110,
        currency: "CHF",
        rating: 4.8,
        imageUrl: "https://picsum.photos/seed/SUP-Yoga-Deluxe/1200/900",
        category: "yoga",
        available: true,
        locationId: "loc-geneva",
        features: ["Yoga", "Premium", "Comfortable", "Stable"],
        length: "11'2\"",
        width: "35\"",
        weight: "14 kg",
        capacity: "Up to 135 kg",
      },
      {
        id: "sup-10",
        name: "Touring Pro Inflatable",
        description:
          "High-end inflatable touring board. Combines portability with performance for serious paddlers.",
        pricePerHour: 30,
        pricePerDay: 95,
        currency: "CHF",
        rating: 4.7,
        imageUrl: "https://picsum.photos/seed/SUP-Touring-Pro/1200/900",
        category: "touring",
        available: true,
        locationId: "loc-zurich",
        features: ["Inflatable", "Touring", "Performance", "Portable"],
        length: "12'",
        width: "31\"",
        weight: "11.5 kg",
        capacity: "Up to 115 kg",
      },
    ];
  },

  /**
   * Get all locations in Switzerland
   */
  async getLocations(): Promise<Location[]> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        id: "loc-zurich",
        name: "Lake Zurich",
        city: "Zurich",
        region: "Zurich",
        address: "Seestrasse 100, 8001 Zurich",
        coordinates: {
          lat: 47.3769,
          lng: 8.5417,
        },
        imageUrl: "https://picsum.photos/seed/Lake-Zurich/1200/900",
        description:
          "Beautiful location on the shores of Lake Zurich. Perfect for beginners and experienced paddlers alike.",
        availableBoards: ["sup-1", "sup-4", "sup-7", "sup-10"],
        operatingHours: {
          open: "08:00",
          close: "20:00",
        },
      },
      {
        id: "loc-lucerne",
        name: "Lake Lucerne",
        city: "Lucerne",
        region: "Lucerne",
        address: "Lakeside Promenade, 6000 Lucerne",
        coordinates: {
          lat: 47.0502,
          lng: 8.3093,
        },
        imageUrl: "https://picsum.photos/seed/Lake-Lucerne/1200/900",
        description:
          "Stunning mountain views surround this location. Ideal for touring and exploring the lake's many bays.",
        availableBoards: ["sup-2", "sup-5", "sup-8"],
        operatingHours: {
          open: "07:00",
          close: "21:00",
        },
      },
      {
        id: "loc-geneva",
        name: "Lake Geneva",
        city: "Geneva",
        region: "Geneva",
        address: "Quai du Mont-Blanc, 1201 Geneva",
        coordinates: {
          lat: 46.2044,
          lng: 6.1432,
        },
        imageUrl: "https://picsum.photos/seed/Lake-Geneva/1200/900",
        description:
          "Prime location on Lake Geneva with views of the Alps. Great for all skill levels and activities.",
        availableBoards: ["sup-3", "sup-6", "sup-9"],
        operatingHours: {
          open: "08:00",
          close: "20:00",
        },
      },
    ];
  },

  /**
   * Filter boards based on criteria
   */
  filterBoards(boards: SUPBoard[], filters: SUPFilter): SUPBoard[] {
    return boards.filter((board) => {
      if (filters.locationId && board.locationId !== filters.locationId)
        return false;
      if (filters.category && board.category !== filters.category) return false;
      if (filters.duration === "hour" && filters.minPrice && board.pricePerHour < filters.minPrice)
        return false;
      if (filters.duration === "hour" && filters.maxPrice && board.pricePerHour > filters.maxPrice)
        return false;
      if (filters.duration === "day" && filters.minPrice && board.pricePerDay < filters.minPrice)
        return false;
      if (filters.duration === "day" && filters.maxPrice && board.pricePerDay > filters.maxPrice)
        return false;
      if (filters.minRating && board.rating < filters.minRating) return false;
      if (filters.available !== undefined && board.available !== filters.available)
        return false;
      return true;
    });
  },

  /**
   * Sort boards
   */
  sortBoards(boards: SUPBoard[], sort: SUPSort): SUPBoard[] {
    const sortedBoards = [...boards];

    switch (sort) {
      case "name":
        return sortedBoards.sort((a, b) => a.name.localeCompare(b.name));
      case "price":
        return sortedBoards.sort((a, b) => a.pricePerHour - b.pricePerHour);
      case "rating":
        return sortedBoards.sort((a, b) => b.rating - a.rating);
      case "popular":
        return sortedBoards.sort((a, b) => b.rating - a.rating); // Mock popular = highest rating
      default:
        return sortedBoards;
    }
  },

  /**
   * Search boards by query
   */
  searchBoards(boards: SUPBoard[], query: string): SUPBoard[] {
    if (!query.trim()) return boards;

    const lowercaseQuery = query.toLowerCase();
    return boards.filter(
      (board) =>
        board.name.toLowerCase().includes(lowercaseQuery) ||
        board.description.toLowerCase().includes(lowercaseQuery) ||
        board.category.toLowerCase().includes(lowercaseQuery) ||
        board.features.some((feature) =>
          feature.toLowerCase().includes(lowercaseQuery),
        ),
    );
  },

  /**
   * Create a booking
   */
  async createBooking(booking: BookingRequest): Promise<Booking> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const boards = await this.getBoards();
    const board = boards.find((b) => b.id === booking.boardId);
    if (!board) throw new Error("Board not found");

    const price =
      booking.duration === "hour"
        ? board.pricePerHour
        : booking.duration === "day"
          ? board.pricePerDay
          : board.pricePerDay * 2; // Multi-day

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      boardId: booking.boardId,
      locationId: booking.locationId,
      startDate: booking.startDate,
      endDate: booking.endDate,
      duration: booking.duration,
      totalPrice: price,
      currency: board.currency,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    return newBooking;
  },

  /**
   * Cancel a booking
   */
  async cancelBooking(bookingId: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In a real app, this would update the booking status
  },
};


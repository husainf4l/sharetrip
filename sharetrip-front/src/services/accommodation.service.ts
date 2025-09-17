import { Apartment } from "@/types/common";
import { apiService } from "./api";

type AccommodationCategory = {
  id: string;
  name: string;
  type: string;
  title: string;
  subtitle: string;
  image: string;
  sectionTitle: string;
  message: string;
};

// Demo data that will later be replaced with backend API calls
const demoApartments: Apartment[] = [
  {
    id: "1",
    title: "Modern Studio Apartment",
    description: "A beautifully designed modern studio apartment with all amenities. Perfect for couples or solo travelers looking for comfort and style.",
    categoryId: "0a2cb33b-b8c3-451c-9040-900f10a6907d",
    hostId: "d3b296ee-0c12-4cbd-bd59-bd65723f2f7a",
    city: "Limassol",
    country: "Cyprus",
    address: "Central Limassol",
    latitude: 34.7071,
    longitude: 33.0226,
    basePrice: 8500,
    currency: "USD",
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["WiFi", "Parking", "TV", "Kitchen", "Air Conditioning", "Balcony"],
    images: ["/hero/villa.jpg"],
    isAvailable: true,
    status: "active",
    createdAt: "2025-09-17T00:19:35.758Z",
    updatedAt: "2025-09-17T00:45:58.042Z",
    host: {
      id: "d3b296ee-0c12-4cbd-bd59-bd65723f2f7a",
      name: "Ahmed Al-Jordan",
      email: "ahmed.jordan@example.com",
      image: null,
    },
    category: {
      id: "0a2cb33b-b8c3-451c-9040-900f10a6907d",
      type: "apartment",
      title: "Find Your Perfect Apartment",
      subtitle: "Self-catering apartments and studios",
      image: "https://www.saiihotels.com/wp-content/uploads/2025/05/250310-Saii-Samui-0010.webp",
      sectionTitle: "Apartments",
      message: "Showing apartments...",
      createdAt: "2025-09-17T00:19:35.758Z",
      updatedAt: "2025-09-17T00:31:24.534Z",
    },
  },
  {
    id: "2",
    title: "Luxury Beachfront Apartment",
    description: "Stunning beachfront apartment with panoramic sea views. Features modern furnishings and direct beach access.",
    categoryId: "0a2cb33b-b8c3-451c-9040-900f10a6907d",
    hostId: "d3b296ee-0c12-4cbd-bd59-bd65723f2f7a",
    city: "Paphos",
    country: "Cyprus",
    address: "Beachfront Paphos",
    latitude: 34.7768,
    longitude: 32.4245,
    basePrice: 15000,
    currency: "USD",
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["WiFi", "Parking", "TV", "Kitchen", "Pool", "Beach Access"],
    images: ["/hero/villa.jpg"],
    isAvailable: true,
    status: "active",
    createdAt: "2025-09-17T00:19:35.758Z",
    updatedAt: "2025-09-17T00:45:58.042Z",
    host: {
      id: "d3b296ee-0c12-4cbd-bd59-bd65723f2f7a",
      name: "Ahmed Al-Jordan",
      email: "ahmed.jordan@example.com",
      image: null,
    },
    category: {
      id: "0a2cb33b-b8c3-451c-9040-900f10a6907d",
      type: "apartment",
      title: "Find Your Perfect Apartment",
      subtitle: "Self-catering apartments and studios",
      image: "https://www.saiihotels.com/wp-content/uploads/2025/05/250310-Saii-Samui-0010.webp",
      sectionTitle: "Apartments",
      message: "Showing apartments...",
      createdAt: "2025-09-17T00:19:35.758Z",
      updatedAt: "2025-09-17T00:31:24.534Z",
    },
  },
];

class AccommodationService {
  async getAccommodations(): Promise<Apartment[]> {
    try {
      const response = await apiService.get('/accommodations') as Apartment[] | { data: Apartment[] };
      // The API returns the array directly, not wrapped in a data property
      return Array.isArray(response) ? response : (response as { data: Apartment[] }).data || [];
    } catch (error) {
      console.error('Failed to fetch accommodations:', error);
      // Fallback to demo data if API fails
      return this.getDemoApartments();
    }
  }

  async getAccommodationsByCategory(type: string): Promise<Apartment[]> {
    try {
      const response = await apiService.get(`/accommodations/categories/${type}/accommodations`) as Apartment[] | { data: Apartment[] };
      // The API returns the array directly, not wrapped in a data property
      return Array.isArray(response) ? response : (response as { data: Apartment[] }).data || [];
    } catch (error) {
      console.error(`Failed to fetch accommodations for category ${type}:`, error);
      // Fallback to filtering demo data by category
      const accommodations = this.getDemoApartments();
      return accommodations.filter(apt => apt.category.type === type);
    }
  }

  private getDemoApartments(): Apartment[] {
    return demoApartments;
  }

  async getCategories(): Promise<AccommodationCategory[]> {
    try {
      const response = await apiService.get('/accommodations/categories') as AccommodationCategory[] | { data: AccommodationCategory[] };
      // The API returns the array directly, not wrapped in a data property
      return Array.isArray(response) ? response : (response as { data: AccommodationCategory[] }).data || [];
    } catch (error) {
      console.error('Failed to fetch accommodation categories:', error);
      // Fallback to demo categories if API fails
      return this.getDemoCategories();
    }
  }

  private getDemoCategories(): AccommodationCategory[] {
    return [
      {
        id: "hotel",
        name: "Hotels",
        type: "hotel",
        title: "Find Your Perfect Hotel",
        subtitle: "Luxury and budget hotels worldwide",
        image: "/hero/hotel.webp",
        sectionTitle: "Hotels",
        message: "Showing hotels...",
      },
      {
        id: "apartment",
        name: "Apartments",
        type: "apartment",
        title: "Find Your Perfect Apartment",
        subtitle: "Self-catering apartments and studios",
        image: "/hero/apartment.webp",
        sectionTitle: "Apartments",
        message: "Showing apartments...",
      },
      {
        id: "resorts",
        name: "Resorts",
        type: "resorts",
        title: "Luxury Resorts & Spas",
        subtitle: "All-inclusive resorts and spas",
        image: "/hero/resort.webp",
        sectionTitle: "Resorts",
        message: "Showing resorts...",
      },
      {
        id: "hostels",
        name: "Hostels",
        type: "hostels",
        title: "Budget-Friendly Hostels",
        subtitle: "Budget-friendly shared accommodations",
        image: "/hero/hostels.webp",
        sectionTitle: "Hostels",
        message: "Showing hostels...",
      },
      {
        id: "motel",
        name: "Motels",
        type: "motel",
        title: "Convenient Motels for Your Stay",
        subtitle: "Convenient roadside accommodations",
        image: "/hero/motels.webp",
        sectionTitle: "Motels",
        message: "Showing motels...",
      },
      {
        id: "villas",
        name: "Villas",
        type: "villas",
        title: "Private Villas & Vacation Homes",
        subtitle: "Private villas and vacation homes",
        image: "/hero/villa.webp",
        sectionTitle: "Villas",
        message: "Showing villas...",
      },
      {
        id: "chalets",
        name: "Chalets",
        type: "chalets",
        title: "Mountain Chalets & Cabins",
        subtitle: "Mountain chalets and cabins",
        image: "/hero/chalets.webp",
        sectionTitle: "Chalets",
        message: "Showing chalets...",
      },
      {
        id: "treehouses",
        name: "Treehouses",
        type: "treehouses",
        title: "Unique Treehouse Accommodations",
        subtitle: "Unique treehouse accommodations",
        image: "/hero/treehouses.webp",
        sectionTitle: "Treehouses",
        message: "Showing treehouses...",
      },
      {
        id: "guest-houses",
        name: "Guest Houses",
        type: "guest-houses",
        title: "Homely Guest Houses & B&Bs",
        subtitle: "Homely guest houses and B&Bs",
        image: "/hero/villa.jpg",
        sectionTitle: "Guest Houses",
        message: "Showing guest houses...",
      },
      {
        id: "vacation-homes",
        name: "Vacation Homes",
        type: "vacation-homes",
        title: "Entire Vacation Homes",
        subtitle: "Entire homes for your vacation",
        image: "/hero/villa.jpg",
        sectionTitle: "Vacation Homes",
        message: "Showing vacation homes...",
      },
      {
        id: "caravans",
        name: "Caravans",
        type: "caravans",
        title: "Mobile Caravans & RVs",
        subtitle: "Mobile caravans and RVs",
        image: "/hero/caravan.webp",
        sectionTitle: "Caravans",
        message: "Showing caravans...",
      },
    ];
  }

  async getCategoryContent(type: string) {
    try {
      const categories = await this.getCategories();
      const category = categories.find(cat => cat.type === type);
      if (category) {
        return {
          title: category.title,
          subtitle: category.subtitle,
          image: category.image,
          sectionTitle: category.sectionTitle,
          message: category.message,
        };
      }
    } catch (error) {
      console.error('Failed to get category content:', error);
    }

    // Fallback to default
    return {
      title: "Find Your Perfect Accommodation",
      subtitle: "Discover hotels, apartments, resorts and more worldwide",
      image: "/hero/hero1.webp",
      sectionTitle: "All Accommodations",
      message: "Showing all accommodations...",
    };
  }

  async getAccommodationById(id: string): Promise<Apartment | null> {
    try {
      const response = await apiService.get(`/accommodations/${id}`) as Apartment | null;
      // The API returns the object directly, not wrapped in a data property
      return response || null;
    } catch (error) {
      console.error('Failed to fetch accommodation by ID:', error);
      // Fallback to finding in demo data
      const accommodations = this.getDemoApartments();
      return accommodations.find(apt => apt.id === id) || null;
    }
  }

  async createAccommodation(accommodationData: {
    title: string;
    description: string;
    categoryId: string;
    city: string;
    country: string;
    address: string;
    latitude?: number;
    longitude?: number;
    basePrice: number;
    currency: string;
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
    images: string[];
    isAvailable: boolean;
  }) {
    try {
      const response = await apiService.post('/accommodations', accommodationData);
      return response;
    } catch (error) {
      console.error('Failed to create accommodation:', error);
      throw error;
    }
  }

  // TODO: Implement when backend endpoint is available
  async searchAccommodations(filters: {
    location?: string;
    type?: string;
    priceMin?: number;
    priceMax?: number;
    bedrooms?: number;
    bathrooms?: number;
  }): Promise<Apartment[]> {
    try {
      // Build query parameters from filters
      const queryParams = new URLSearchParams();
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.priceMin) queryParams.append('priceMin', filters.priceMin.toString());
      if (filters.priceMax) queryParams.append('priceMax', filters.priceMax.toString());
      if (filters.bedrooms) queryParams.append('bedrooms', filters.bedrooms.toString());
      if (filters.bathrooms) queryParams.append('bathrooms', filters.bathrooms.toString());

      const queryString = queryParams.toString();
      const endpoint = queryString ? `/accommodations/search?${queryString}` : '/accommodations';

      const response = await apiService.get(endpoint) as Apartment[] | { data: Apartment[] };
      // The API returns the array directly, not wrapped in a data property
      return Array.isArray(response) ? response : (response as { data: Apartment[] }).data || [];
    } catch (error) {
      console.error('Failed to search accommodations:', error);
      // Fallback to client-side filtering of demo data
      const accommodations = this.getDemoApartments();
      return accommodations.filter(apt => {
        if (filters.location && !(`${apt.city}, ${apt.country}`).toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
        if (filters.bedrooms && apt.bedrooms < filters.bedrooms) {
          return false;
        }
        if (filters.bathrooms && apt.bathrooms < filters.bathrooms) {
          return false;
        }
        return true;
      });
    }
  }
}

export const accommodationService = new AccommodationService();
export default accommodationService;
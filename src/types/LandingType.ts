export interface CategorytypeProps {
  categories: { id: string; name: string }[];
}

export type HouseQueryParams = {
  [key: string]: string | number | undefined;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  search?: string;
  location?: string;
  propertyType?: string;
  transactionType?: string;
  minPrice?: number;
  maxPrice?: number;
  minRent?: number;
  maxRent?: number;
  minMortgage?: number;
  maxMortgage?: number;
  minArea?: number;
  maxArea?: number;
};

export interface HouseTypeProps {
  houses: Array<{
    id: string;
    title: string;
    address: string;
    bathrooms: number;
    capacity: number;
    categories: {
      id: number;
      name: string;
    };
    last_updated: string;
    location: {
      lat: number;
      lng: number;
    };
    num_comments: number;
    parking: number;
    photos: string[];
    price: string;
    rate: number;
    rooms: number;
    sellerId: string;
    sellerName: string;
    tags: string[];
    transaction_type: string;
    yard_type: string;
  }>;
}

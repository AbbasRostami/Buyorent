export interface HouseReserveProps {
  id: string;
  title: string;
  address: string;
  photos: string[];
  rate: string;
  price: string;
  tags: string[];
  last_updated: string;
  capacity: number;
  location: { lat: number; lng: number };
  categories: { id: number; name: string };
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  num_comments: number;
  transaction_type: string;
  sellerId: string;
  sellerName: string;
  caption: string | null;
}

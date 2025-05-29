export interface HouseItemsInterface {
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

export interface PropertySearchResult {
  houseId: number;
  reason: string;
}

export interface PropertySearchParams {
  userInput: string;
  budget: number | undefined;
  houses: HouseItemsInterface[];
}

export const convertToHouseItems = (
  houses: {
    id: string;
    title: string;
    photos: string[];
    address: string;
    rooms: number;
    bathrooms: number;
    parking: number;
    price: number;
  }[]
): HouseItemsInterface[] => {
  return houses.map((house) => ({
    ...house,
    rate: "0",
    price: house.price.toString(),
    tags: [],
    last_updated: new Date().toISOString(),
    capacity: 0,
    location: { lat: 0, lng: 0 },
    categories: { id: 0, name: "" },
    yard_type: "",
    num_comments: 0,
    transaction_type: "rent",
    sellerId: "",
    sellerName: "",
    caption: null,
  }));
};

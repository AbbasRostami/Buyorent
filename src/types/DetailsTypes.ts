export type HouseSingleHousesProps = {
  id: string;
  title: string;
  address: string;
  photos: string[];
  rate: string;
  price: string;
  tags: string[];
  last_updated: string;
  capacity: number;
  location: {
    lat: number;
    lng: number;
  };
  categories: {
    id: number;
    name: string;
  };
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string;
  num_comments: number;
  transaction_type: "rent" | "mortgage" | "sale" | string;
  sellerId: string;
  sellerName: string;
  caption: string | null;
};

export type HouseDetailsData = Pick<
  HouseSingleHousesProps,
  | "rooms"
  | "bathrooms"
  | "categories"
  | "yard_type"
  | "parking"
  | "price"
  | "sellerName"
  | "last_updated"
  | "tags"
  | "address"
>;

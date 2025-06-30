export interface BookingDataSeller {
  id: number;
  title: string;
  bioPerson: string;
  date: string;
  price: number;
  passengers: string;
  status: "canceled" | "pending" | "confirmed";
  payment_status: "تایید شده" | "لغو شده";
  image: string;
  totalCount: number;
}

export interface ReservedDate {
  value: string;
  inclusive: boolean;
}

export interface TravelerDetail {
  birthDate: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  nationalId: string;
}

export interface BookingDataSeller {
  id: number;
  user_id: number;
  houseId: number;
  sharedEmail: string;
  sharedMobile: string;
  status: "canceled" | "pending" | "confirmed";
  createdAt: string;
  updatedAt: string;
  reservedDates: ReservedDate[];
  traveler_details: TravelerDetail[];
  house: any;
}
export interface BookingSellerResponse {
  data: BookingDataSeller[];
  totalCount: number;
}
export interface BookingDataBuyer {
  id: number;
  title?: string;
  bioPerson?: string;
  date?: string;
  price?: number;
  passengers?: string;
  status: "canceled" | "pending" | "confirmed";
  payment_status?: "تایید شده" | "لغو شده";
  image?: string;
  totalCount?: number;
  user_id?: number ;
  sharedEmail?: string;
  sharedMobile?: string;
  createdAt?: string;
  updatedAt?: string;
  reservedDates?: ReservedDate[];
  traveler_details?: TravelerDetail[];
  house?: any;
  rowIndex?: number;
  houseId?: number;
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

export interface BookingBuyerResponse {
  data: BookingDataBuyer[];
  totalCount: number;
}

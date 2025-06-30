export interface TravelerDetail {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  birthDate: string;
  nationalId: string;
}

export interface BookingRequest {
  houseId: string;
  reservedDates: string[];
  traveler_details: TravelerDetail[];
  sharedEmail: string;
  sharedMobile: string;
}

export interface BookingResponse {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
  message?: string;
}

export interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  houseId: string;
  reservedDates: string[];
  travelerCount: number;
  totalPrice: number;
}

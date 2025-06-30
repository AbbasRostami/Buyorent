import { BookingRequest, BookingResponse } from "@/types/BookingModalReserve";
import { usePost } from "@/utils/hooks/useReactQueryHooks";
import { toast } from "react-hot-toast";

export const CreateBooking = (onClose: () => void) => {
  return usePost<BookingResponse, BookingRequest>("/bookings", {
    onSuccess: (data) => {
      toast.success("رزرو با موفقیت ثبت شد");
      onClose();
    },
    onError: (error) => {
      toast.error("رزرو با مشکل مواجه شد");
    },
  });
};

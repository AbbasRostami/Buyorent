import { useDelete } from "@/utils/hooks/useReactQueryHooks";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useDelete((id: number) => `/bookings/${id}`, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookingBuyer"] });
      toast.success("آیتم انتخابی با موفقیت حذف شد");
    },
    onError: () => {
      toast.error("خطا در حذف رزرو");
    },
  });

  return { deleteBooking: mutate, isPending };
};

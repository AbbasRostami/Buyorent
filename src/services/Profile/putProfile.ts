import { toast } from "react-hot-toast";
import { usePut } from "@/utils/hooks/useReactQueryHooks";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";
interface UserProfileUpdateType {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  profilePicture?: string;
}

export const useUpdateProfile = () => {
  const { data: session } = useSession();
  const userId = session?.id;
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isPending: isUpdating } =
    usePut<UserProfileUpdateType>(`/users/${userId}`, {
      onSuccess: () => {
        toast.success("اطلاعات با موفقیت ذخیره شد");
        console.log("اطلاعات با موفقیت ذخیره شد");
      },
      onError: (error) => {
        toast.error(`خطا در ذخیره اطلاعات: ${error.message}`);
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-profile"],
          refetchType: "active",
        });
      },
    });
  return { updateProfile, isUpdating };
};

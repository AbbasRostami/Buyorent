import { useGet } from "@/utils/hooks/useReactQueryHooks";
import { useSession } from "next-auth/react";

type UserType = {
  user: {
    id: string;
    role: string;
    membershipDate: string | null;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    verificationCode: string | null;
    verificationCodeExpires: string | null;
    fullName: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
  };
};


export const useProfile = () => {
  const { data: session } = useSession();
  const userId = session?.id;
  const {
    data: user,
    isLoading,
    error,
  } = useGet<UserType>(
    userId ? `/users/${userId}` : "",
    undefined,
    {
      enabled: !!userId,
      queryKey: ["user-profile", userId],
    }
  );
  return { user, isLoading, error };
};

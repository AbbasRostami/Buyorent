import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

type CurrentUser = {
  userId: string | null;
  email: string | null;
  role: string | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  session: Session | null;
};

export const useCurrentUser = (): CurrentUser => {
  const { data: session, status } = useSession();

  const userId = session?.id ?? null;
  const email = session?.user?.email ?? null;
  const role = session?.role ?? null;
  const accessToken = session?.accessToken ?? null;

  return {
    userId,
    email,
    role,
    accessToken,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    session: session ?? null,
  };
};

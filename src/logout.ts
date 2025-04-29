import { signOut } from "next-auth/react";

export const customLogout = async (refreshToken: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
    });
  } catch (err) {
    console.error("❌ Logout API error:", err);
  } finally {
    await signOut({ redirect: true });
  }
};

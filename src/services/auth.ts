import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

type Token = {
  accessToken?: string;
  refreshToken?: string;
  exp?: number;
};

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    accessToken: string;
    refreshToken: string;
  }
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    exp?: number;
  }
}

async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken: token.refreshToken }),
    });

    if (!res.ok) throw new Error("Failed to refresh token");

    const data = await res.json();

    const payload = JSON.parse(atob(data.accessToken.split(".")[1]));

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken ?? token.refreshToken,
      exp: payload.exp,
    };
  } catch (error) {
    console.error("Error refreshing token:", error);
    return {
      ...token,
      exp: Math.floor(Date.now() / 1000) + 60, // fallback 1 دقیقه
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      async authorize(credentials: any) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!res.ok) {
            const text = await res.text();
            throw new Error(`Login failed: ${text || "مشخص نشده"}`);
          }

          const data = await res.json();

          return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            email: credentials.email,
          };
        } catch (err) {
          console.error("Login error:", err);
          throw new Error("🚨 An error occurred during login");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        const payload = JSON.parse(atob(user.accessToken.split(".")[1]));
        token.exp = payload.exp;

        return token;
      }

      const now = Math.floor(Date.now() / 1000);

      if (token.exp && token.exp > now + 30) {
        return token;
      }

      console.log("🔁 Token expired or about to expire, refreshing...");

      const newToken = await refreshAccessToken(token);

      try {
        if (newToken.accessToken) {
          const payload = JSON.parse(atob(newToken.accessToken.split(".")[1]));
          newToken.exp = payload.exp;
        } else {
          throw new Error("No access token available");
        }
      } catch {
        newToken.exp = Math.floor(Date.now() / 1000) + 300;
      }

      return {
        ...token,
        ...newToken,
      };
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      session.exp = token.exp;
      return session;
    },

    async authorized({ auth, request }: any) {
      const isAuthorized = !!auth?.accessToken;
      const privateRoutes = ["/reserve-houses"];

      const isPrivateRoute = privateRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      if (isPrivateRoute && !isAuthorized) {
        return Response.redirect(new URL("/", request.nextUrl.origin));
      }

      return true;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1,
  },

  pages: {
    signIn: "/login",
    error: "/login?error=true",
  },

  events: {
    async signOut(message) {
      const token = (message as { token?: Token }).token;

      if (!token?.refreshToken) return;

      try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: token.refreshToken }),
        });
        console.log("✅ Logout API called from events");
      } catch (error) {
        console.error("❌ Logout failed in events:", error);
      }
    },
  },
});

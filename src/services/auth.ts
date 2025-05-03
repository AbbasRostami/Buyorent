import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
  }
  interface User {
    accessToken: string;
    refreshToken: string;
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
            const textResponse = await res.text();
            console.log("Error response text:", textResponse);
            throw new Error(`❌ Login failed: ${textResponse || "مشخص نشده"}`);
          }

          const data = await res.json();
          console.log("paaaaaaaaaaaaaaaappaa: ", credentials);

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
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token || user.accessToken;
        token.refreshToken = account.refresh_token || user.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
    async authorized({ auth, request }: any) {
      const isAuthorized = !!auth?.accessToken;
      const privateRoutes = ["/users"];

      const isPrivateRoute = privateRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
      );

      if (isPrivateRoute && !isAuthorized) {
        return Response.redirect(new URL("/", request.nextUrl.origin));
      }

      return true;
    },
  },
});

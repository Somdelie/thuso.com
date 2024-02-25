export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.lastName = user.lastName;
        token.status = user.status;
        token.address = user.address;
        token.phone = user.phone;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.lastName = token.lastName;
        session.user.status = token.status;
        session.user.address = token.address;
        session.user.phone = token.phone;
        session.user.role = token.role;
        return session;
      }
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnAdminPanel =
        request.nextUrl.pathname.startsWith("/admin-panel");
      const isOnSettings =
        request.nextUrl.pathname.startsWith("/settings") ||
        request.nextUrl.pathname.startsWith("/admin-panel"); // Check each path separately
      const isOnLogin = request.nextUrl.pathname.startsWith("/auth");

      // Only admin can reach the admin dashboard
      if (isOnAdminPanel && user && user.role === "ADMIN") {
        return true;
      }

      if (isOnSettings && (!user || (user && user.role !== "ADMIN"))) {
        // Redirect to the 404 page
        return Response.redirect(new URL("/settings", request.nextUrl));
      }

      // // Only authenticated users can reach the admin settings
      // if (isOnSettings && !user) {
      //   return false;
      // }

      // Only unauthenticated users can reach the admin login
      if (isOnLogin && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      // Default deny access
      return true;
    },
  },
};

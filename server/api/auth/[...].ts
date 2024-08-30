import Auth0Provider from "next-auth/providers/auth0";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  secret: process.env.SECRET,
  providers: [
    Auth0Provider.default({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_DOMAIN,
    }),
  ],
  callbacks: {
    /* on before signin */
    async signIn({ user, account, profile, email, credentials }) {
      // console.log("Sign In");
      // console.log(user);
      // console.log(account);
      // console.log(profile);
      // console.log(email);
      // console.log(credentials);
      return true;
    },
    /* on redirect to another url */
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    /* on session retrival */
    async session({ session, user, token }) {
      // console.log("Session");
      // console.log(session);
      // console.log(user);
      // console.log(token);
      return session;
    },
    /* on JWT token creation or mutation */
    async jwt({ token, user, account, profile, isNewUser }) {
      // console.log("JWT");
      // console.log(token);
      // console.log(user);
      // console.log(account);
      // console.log(profile);
      return token;
    },
  },
  events: {
    async signIn(message) {
      /* on successful sign in */
    },
    async signOut(message) {
      /* on signout */
    },
    async createUser(message) {
      /* user created */
    },
    async updateUser(message) {
      /* user updated - e.g. their email was verified */
    },
    async linkAccount(message) {
      /* account (e.g. GitHub) linked to a user */
    },
    async session(message) {
      /* session is active */
    },
  },
});

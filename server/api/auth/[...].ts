import Auth0Provider from "next-auth/providers/auth0";
import { NuxtAuthHandler } from "#auth";
import {createUser, getUserById} from "~/server/services/user";

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
            const userExists = await getUserById({ id: user.id })
            if (userExists == null) {
                await createUser({ userId: user.id, username: user.name, profileImage: user.image})
                return true
            }



            return true;
        },
        /* on redirect to another url */
        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        /* on session retrival */
        async session({ session, user, token }) {

            return session;
        },
        /* on JWT token creation or mutation */
        async jwt({ token, user, account, profile, isNewUser }) {

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

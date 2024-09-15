import Auth0Provider from "next-auth/providers/auth0";
import { NuxtAuthHandler } from "#auth";
import {createUser, doesUserExist } from "~/server/services/user";

export default NuxtAuthHandler({
    secret: process.env.SECRET,
    providers: [
        Auth0Provider.default({
            clientId: process.env.AUTH0_CLIENT_ID as string,
            clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
            issuer: `https://${process.env.AUTH0_DOMAIN}`,
        }),
    ],
    callbacks: {
        /* on before signin */
        async signIn({ user, account, profile, email, credentials }) {

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
            try {

                const userExists = await doesUserExist({ username: message.user.email })
                if (!userExists) {
                    await createUser({
                        username: message.user.email as string, profileImage: message.user.image as string })
                }
            } catch (err) {
                console.error(err)
            }
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

import { signOut } from "next-auth/react";

export const handleLogin = async () => {
    const { signIn } = useAuth();
    await signIn("auth0");
};

export const handleAuth0Logout = async () => {
    const runtimeConfig = useRuntimeConfig()


    const redirectUrl = `${runtimeConfig.public.BASE_URL}/logout`;

    window.location.href = `https://${runtimeConfig.public.AUTH0_DOMAIN}/oidc/logout?client_id=`
        + `${runtimeConfig.public.AUTH0_CLIENT_ID}&post_logout_redirect_uri=${redirectUrl}`;
};

export const handleApplicationLogout = async () => {
    try {

        await signOut();
    } catch (err) {

    }
};

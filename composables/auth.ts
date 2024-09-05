import {signOut} from "next-auth/react";
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN, BASE_URL} from "~/utils/constants";

export const handleLogin = async () => {
    const {signIn} = useAuth()
    await signIn('auth0')

}

export const handleAuth0Logout = async () => {

    const redirectUrl =  `${BASE_URL}/logout`

    window.location.href = `https://${AUTH0_DOMAIN}/oidc/logout?client_id=${AUTH0_CLIENT_ID}&post_logout_redirect_uri=${redirectUrl}`
}

export const handleApplicationLogout = async () => {
    await signOut()
}
export default defineNuxtRouteMiddleware((to, from) => {
    const authenticated = useCookie("next-auth.session-token");
    console.log(authenticated.value);
    // if (!authenticated.value && to.path !== "/") {
    //     return navigateTo("/");
    // }

    if (authenticated.value && to.path === "/") {
        return navigateTo("/dashboard");
    }
});

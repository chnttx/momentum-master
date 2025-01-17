// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    devtools: { enabled: true },
    modules: ["@nuxt/test-utils/module", "@sidebase/nuxt-auth", "@nuxt/ui", "nuxt-security", "@samk-dev/nuxt-vcalendar"],
    runtimeConfig: {
        public: {
            BASE_URL:
                process.env.BASE_URL || `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`,
            AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
            AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
        },
    },
    auth: {
        globalAppMiddleware: true,
        isEnabled: true,
        disableServerSideAuth: false,
        originEnvKey: "AUTH_ORIGIN",
        baseURL:
            process.env.BASE_URL ||
            `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/auth`,
        provider: {
            type: "authjs",
            trustHost: false,
            defaultProvider: "auth0",
            addDefaultCallbackUrl: false,
        },
        sessionRefresh: {
            /* Refresh the session cookie every hour */
            enablePeriodically: 3600000,
            enableOnWindowFocus: true,
        },
    },
    security: {
        headers: {
            contentSecurityPolicy: { "img-src": ["*", "data:"] },
            crossOriginResourcePolicy: "cross-origin",
        },
        corsHandler: {
            origin: ["https://zenquotes.io/", "https://www.google.com/"],
        },
    },
    css: ["~/assets/css/reset.css"],
    app: {
        head: {
            link: [
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/icon?family=Material+Icons",
                },
            ],
        },
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@use "~/assets/scss/_colors.scss" as *; @use "~/assets/scss/_fonts.scss" as *;',
                },
            },
        },
    },
});
import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private"

export const handle = SvelteKitAuth(async (event) => {
    const authOptions = {
        providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
        callbacks: {
            async signIn({ account, profile }) {
                if(account.provider === "google") {
                    return profile.email_verified && profile.email.endsWith("@clubspeed.com")
                }
                return true
            },
        },
        secret: AUTH_SECRET,
        trustHost: true,
        session: {
            maxAge: 5 * 24 * 60 * 60,
            updateAge: 5 * 24 * 60 * 60,
        },
    }
    return authOptions
})
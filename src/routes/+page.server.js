import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
    const sessionId = cookies.get('session');

    if(sessionId) {
        throw redirect(302, '/dashboard');
    }

    return {
        user: sessionId
    }
}
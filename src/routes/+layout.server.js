export async function load({ cookies }) {
    const sessionId = cookies.get('session');

    return {
        user: sessionId
    }
}
import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
    let session = cookies.get("session");
    if (!session) {
        redirect(302, "/");
    } else {
        return {};
    }
}

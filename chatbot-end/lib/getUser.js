import { cookies } from "next/headers";

// This is used from next.js server components
// it helps us get the user from the session cookie
// This means on initial load of the page, we can display
// user information without having to wait for the client side JS
// Note: this code does not factor in security best practices

export default function getUser() {
	const cookieStore = cookies();
	const userCookie = cookieStore.get("CODELAB_CHATBOT_USER");

	if (userCookie?.value) {
		try {
			const parsedUser = JSON.parse(userCookie.value);
			return parsedUser;
		} catch (err) {
			console.log(`Error parsing user cookie`, err);
		}
	}
}
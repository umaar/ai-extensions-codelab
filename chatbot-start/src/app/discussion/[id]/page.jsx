/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { getFirestore } from "firebase/firestore";
import { getDiscussions, getMessages } from "@/lib/firebase/firestore.js";
import { getAuthenticatedAppForUser } from "@/lib/firebase/firebase";
import Chat from "@/components/Chat";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Discussion({ params }) {
	const { app, currentUser } = await getAuthenticatedAppForUser();
	const db = getFirestore(app);
	const user = currentUser?.toJSON();
	let discussions = await getDiscussions(db, user?.uid);
	const messages = await getMessages(db, user?.uid, params.id);

	if (params.id === "new") {
		discussions = [
			{
				id: "new",
			},
			...discussions,
		];
	} else if (!messages.length) {
		return redirect(`/`);
	}

	return (
		<main>
			<Chat
				initialDiscussions={discussions}
				initialDiscussionId={params.id}
				initialMessages={messages}
				initialUser={user}
			/>
		</main>
	);
}

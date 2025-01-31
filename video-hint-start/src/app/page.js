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

import getUser from "@/lib/getUser.js";
import { getVideos } from "@/lib/firebase/firestore.js";
import Main from "@/components/Main";

export const dynamic = "force-dynamic";

export default async function Discussion() {
	const user = getUser();
	const videos = await getVideos(user?.id);

	return (
		<main>
			<Main initialVideos={videos} initialUser={user} />
		</main>
	);
}

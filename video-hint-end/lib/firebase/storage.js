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

import {
	ref,
	uploadBytesResumable,
	getDownloadURL as _getDownloadURL,
	getStorage
} from "firebase/storage";

import { storage } from "@/lib/firebase/firebase";

export async function uploadVideo(userId, filePath, file) {
	const storageRef = ref(storage, `video_annotation_input/${filePath}`);
	const uploadTask = uploadBytesResumable(storageRef, file, {
		customMetadata: {
			uid: userId,
		},
	});

	return uploadTask;
}

export async function getDownloadURL(storage, file) {
	const storageRef = ref(storage, file);
	const url = await _getDownloadURL(storageRef);
	return url;
}

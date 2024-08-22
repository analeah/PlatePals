import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from '@/utilities/firebase/firebase';
import { constants } from "fs";

const functions = getFunctions(app);

const generateUploadUrl = httpsCallable(functions, 'generateUploadUrl');

export async function uploadVideo(file: File) {
  const response: any = await generateUploadUrl({
    fileExtension: file.name.split('.').pop()
  });

  // Upload the file via the signed URL
  await fetch(response?.data?.url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type
    }
  });
  
  return;
}
import { put, del } from '@vercel/blob';

/**
 * Upload audio data to Vercel Blob Storage
 * @param audioData The audio data as a Blob or File
 * @param fileName The name to use for the file
 * @returns The URL of the uploaded file
 */
export async function uploadAudioToStorage(audioData: Blob | File, fileName: string): Promise<string> {
  try {
    // Upload to Vercel Blob Storage
    const { url } = await put(fileName, audioData, {
      access: 'public',
      addRandomSuffix: true, // Add a random suffix to ensure uniqueness
    });
    
    return url;
  } catch (error) {
    console.error('Error uploading audio to storage:', error);
    throw new Error('Failed to upload audio to storage');
  }
}

/**
 * Delete audio file from Vercel Blob Storage
 * @param url The URL of the file to delete
 */
export async function deleteAudioFromStorage(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('Error deleting audio from storage:', error);
    throw new Error('Failed to delete audio from storage');
  }
}

/**
 * Convert an audio stream to a Blob
 * @param stream The ReadableStream of audio data
 * @returns A Promise that resolves to a Blob
 */
export async function streamToBlob(stream: ReadableStream): Promise<Blob> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  
  return new Blob(chunks, { type: 'audio/mpeg' });
}

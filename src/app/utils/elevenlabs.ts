/**
 * ElevenLabs API utility functions - Client-side implementation
 * Uses server API routes to avoid Node.js-specific imports in client bundle
 */

// Voice IDs
export const DEFAULT_VOICE_ID = 'ZT9u07TYPVl83ejeLakq'; // Rachel voice

// Available voices
export const AVAILABLE_VOICES = [    
  { id: 'ZT9u07TYPVl83ejeLakq', name: 'Rachel (Default)' },
  { id: '5TZtQYDIn8M40udRnoVI', name: 'Dee - Australian' },
  { id: 'XJ2fW4ybq7HouelYYGcL', name: 'Cherry Twinkle – Adorable Cartoon Girl' },
  { id: 'XXphLKNRxvJ1Qa95KBhX', name: "Blondie - Children's Storyteller" },
];

/**
 * Convert text to speech using ElevenLabs API via server route
 * @param text Text to convert to speech
 * @param voiceId Voice ID to use (defaults to Rachel voice)
 * @returns URL to audio file
 */
export async function textToSpeech(text: string, voiceId: string = DEFAULT_VOICE_ID): Promise<string> {
  try {
    // Call our server API route instead of using the ElevenLabs client directly
    const response = await fetch('/api/elevenlabs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, voiceId }),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.success || !data.audio) {
      throw new Error(data.error || 'Failed to convert text to speech');
    }
    
    // Convert base64 audio to blob and create URL
    const audioBlob = base64ToBlob(data.audio, 'audio/mp3');
    const url = URL.createObjectURL(audioBlob);
    
    return url;
  } catch (error) {
    console.error('Error in textToSpeech:', error);
    throw error;
  }
}

/**
 * Get available voices from ElevenLabs API via server route
 * @returns List of available voices
 */
export async function getVoices() {
  try {
    // Call our server API route instead of using the ElevenLabs client directly
    const response = await fetch('/api/elevenlabs');
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return data.voices || AVAILABLE_VOICES;
  } catch (error) {
    console.error('Error fetching voices:', error);
    // Fall back to predefined voices if API call fails
    return AVAILABLE_VOICES;
  }
}

/**
 * Helper function to convert base64 to Blob
 */
function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteArrays = [];
  
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  
  return new Blob(byteArrays, { type: mimeType });
}

/**
 * Generate audio for each chapter and return URLs
 * @param chapters Array of chapter content
 * @param voiceId Voice ID to use
 * @returns Array of audio URLs
 */
export async function generateChapterAudio(
  chapters: string[],
  voiceId: string = DEFAULT_VOICE_ID
): Promise<string[]> {
  const audioUrls: string[] = [];
  
  for (const chapterContent of chapters) {
    try {
      const audioUrl = await textToSpeech(chapterContent, voiceId);
      audioUrls.push(audioUrl);
    } catch (error) {
      console.error('Error generating chapter audio:', error);
      // Push a placeholder in case of error
      audioUrls.push('');
    }
  }
  
  return audioUrls;
}

/**
 * ElevenLabs API utility functions - Client-side implementation
 * Uses fetch API to call server-side API routes instead of direct ElevenLabs client
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
 * Convert text to speech using ElevenLabs API via server-side API route
 * @param text Text to convert to speech
 * @param voiceId Voice ID to use (defaults to Rachel voice)
 * @returns URL to audio blob
 */
export async function textToSpeech(text: string, voiceId: string = DEFAULT_VOICE_ID): Promise<string> {
  try {
    // Call our server-side API route instead of using the ElevenLabs client directly
    const response = await fetch('/api/elevenlabs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, voiceId }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    // Get the audio data as a blob
    const audioBlob = await response.blob();
    
    // Create a URL for the blob
    const url = URL.createObjectURL(audioBlob);
    
    return url;
  } catch (error) {
    console.error('Error in textToSpeech:', error);
    throw error;
  }
}

/**
 * Get available voices from ElevenLabs API via server-side API route
 * @returns List of available voices
 */
export async function getVoices() {
  try {
    // Call our server-side API route
    const response = await fetch('/api/elevenlabs', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.voices;
  } catch (error) {
    console.error('Error fetching voices:', error);
    return [];
  }
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

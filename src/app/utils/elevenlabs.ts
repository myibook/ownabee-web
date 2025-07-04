/**
 * ElevenLabs API utility functions
 */
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const API_KEY = 'sk_9ac848590f82edc99d16bfad44e6be2da0517ed54b63335e';

// Initialize the ElevenLabs client
const client = new ElevenLabsClient({ apiKey: API_KEY });

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
 * Convert text to speech using ElevenLabs API
 * @param text Text to convert to speech
 * @param voiceId Voice ID to use (defaults to Rachel voice)
 * @returns URL to audio file
 */
export async function textToSpeech(text: string, voiceId: string = DEFAULT_VOICE_ID): Promise<string> {
  try {
    // Use the streaming version to get audio data
    const audioStream = await client.textToSpeech.stream(voiceId, {
      text,
      outputFormat: "mp3_44100_128",
      modelId: "eleven_multilingual_v2"
    });
    
    // Create an audio element to play the stream directly
    // This approach uses the MediaSource API which is more efficient for streaming audio
    const mediaSource = new MediaSource();
    const url = URL.createObjectURL(mediaSource);
    
    mediaSource.addEventListener('sourceopen', async () => {
      try {
        // Create a source buffer for MP3 audio
        const sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');
        
        // Process the stream
        const reader = audioStream.getReader();
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // Wait for the source buffer to be ready for more data
          if (sourceBuffer.updating) {
            await new Promise(resolve => {
              sourceBuffer.addEventListener('updateend', resolve, { once: true });
            });
          }
          
          // Append the chunk to the source buffer
          sourceBuffer.appendBuffer(value);
        }
        
        // End of stream
        if (!mediaSource.readyState.includes('closed')) {
          mediaSource.endOfStream();
        }
      } catch (err) {
        console.error('Error processing audio stream:', err);
      }
    });
    
    return url;
  } catch (error) {
    console.error('Error in textToSpeech:', error);
    throw error;
  }
}

/**
 * Get available voices from ElevenLabs API
 * @returns List of available voices
 */
export async function getVoices() {
  try {
    // Use the client to get voices
    const voices = await client.voices.getAll();
    return voices;
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

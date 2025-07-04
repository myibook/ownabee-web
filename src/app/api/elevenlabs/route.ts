import { NextRequest, NextResponse } from 'next/server';
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

// Initialize the ElevenLabs client (server-side only)
const API_KEY = 'sk_9ac848590f82edc99d16bfad44e6be2da0517ed54b63335e';
const client = new ElevenLabsClient({ apiKey: API_KEY });

// Available voices
export const AVAILABLE_VOICES = [    
  { id: 'ZT9u07TYPVl83ejeLakq', name: 'Rachel (Default)' },
  { id: '5TZtQYDIn8M40udRnoVI', name: 'Dee - Australian' },
  { id: 'XJ2fW4ybq7HouelYYGcL', name: 'Cherry Twinkle – Adorable Cartoon Girl' },
  { id: 'XXphLKNRxvJ1Qa95KBhX', name: "Blondie - Children's Storyteller" },
];

/**
 * GET handler for retrieving available voices
 */
export async function GET() {
  try {
    // Use the client to get voices
    const voices = await client.voices.getAll();
    return NextResponse.json({ voices });
  } catch (error) {
    console.error('Error fetching voices:', error);
    return NextResponse.json({ error: 'Failed to fetch voices' }, { status: 500 });
  }
}

/**
 * POST handler for text-to-speech conversion
 */
export async function POST(request: NextRequest) {
  try {
    const { text, voiceId = 'ZT9u07TYPVl83ejeLakq' } = await request.json();
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }
    
    // Generate audio using ElevenLabs API
    const audioResponse = await client.textToSpeech.convert(voiceId, {
      text,
      outputFormat: "mp3_44100_128",
      modelId: "eleven_multilingual_v2"
    });
    
    // Convert audio buffer to base64 for transmission
    // Handle different response types (Response object or ArrayBuffer)
    let audioBuffer;
    if (audioResponse instanceof Response) {
      audioBuffer = await audioResponse.arrayBuffer();
    } else if (audioResponse instanceof ArrayBuffer) {
      audioBuffer = audioResponse;
    } else {
      // Handle other potential response types
      throw new Error('Unexpected response type from ElevenLabs API');
    }
    
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    
    return NextResponse.json({ 
      audio: base64Audio,
      format: 'mp3',
      success: true
    });
  } catch (error) {
    console.error('Error in text-to-speech conversion:', error);
    return NextResponse.json({ 
      error: 'Failed to convert text to speech',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

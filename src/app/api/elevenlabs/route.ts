import { NextRequest, NextResponse } from 'next/server';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const API_KEY = 'sk_9ac848590f82edc99d16bfad44e6be2da0517ed54b63335e';

// Initialize the ElevenLabs client
const client = new ElevenLabsClient({ apiKey: API_KEY });

/**
 * POST handler for text-to-speech conversion
 * @param request Request object containing text and voiceId
 * @returns Response with audio data
 */
export async function POST(request: NextRequest) {
  try {
    const { text, voiceId } = await request.json();
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }
    
    // Use the streaming version to get audio data
    const audioStream = await client.textToSpeech.stream(voiceId, {
      text,
      outputFormat: "mp3_44100_128",
      modelId: "eleven_multilingual_v2"
    });
    
    // Convert stream to buffer
    const chunks: Uint8Array[] = [];
    const reader = audioStream.getReader();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    
    // Combine chunks into a single buffer
    const buffer = Buffer.concat(chunks);
    
    // Return audio data as response
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error in text-to-speech API:', error);
    return NextResponse.json(
      { error: 'Failed to convert text to speech' },
      { status: 500 }
    );
  }
}

/**
 * GET handler for retrieving available voices
 * @returns Response with list of voices
 */
export async function GET() {
  try {
    const voices = await client.voices.getAll();
    return NextResponse.json({ voices });
  } catch (error) {
    console.error('Error fetching voices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch voices' },
      { status: 500 }
    );
  }
}

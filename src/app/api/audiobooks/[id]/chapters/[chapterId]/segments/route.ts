import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';

// GET handler for retrieving audio segments for a chapter
export async function GET(request: NextRequest) {
  // Extract params from the URL path
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const chapterId = pathParts[pathParts.length - 2]; // Get chapterId from URL path
  
  try {
    const audioSegments = await prisma.audioSegment.findMany({
      where: {
        chapterId,
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    return NextResponse.json(audioSegments);
  } catch (error) {
    console.error(`Error fetching audio segments for chapter ${chapterId}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch audio segments' },
      { status: 500 }
    );
  }
}

// POST handler for creating a new audio segment
export async function POST(request: NextRequest) {
  // Extract params from the URL path
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const chapterId = pathParts[pathParts.length - 2]; // Get chapterId from URL path
  
  try {
    const body = await request.json();
    const { voiceId, audioUrl, startTime, endTime, textSegment } = body;

    const audioSegment = await prisma.audioSegment.create({
      data: {
        voiceId,
        audioUrl,
        startTime,
        endTime,
        textSegment,
        chapterId,
      },
    });

    return NextResponse.json(audioSegment, { status: 201 });
  } catch (error) {
    console.error(`Error creating audio segment for chapter ${chapterId}:`, error);
    return NextResponse.json(
      { error: 'Failed to create audio segment' },
      { status: 500 }
    );
  }
}

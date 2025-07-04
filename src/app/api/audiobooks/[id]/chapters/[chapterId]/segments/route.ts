import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';

// GET /api/audiobooks/[id]/chapters/[chapterId]/segments - Get all audio segments for a chapter
export async function GET(request: NextRequest) {
  // Extract params from the URL path
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const id = pathParts[pathParts.indexOf('audiobooks') + 1];
  const chapterId = pathParts[pathParts.indexOf('chapters') + 1];

  try {
    const audioSegments = await prisma.audioSegment.findMany({
      where: {
        chapterId: chapterId,
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

// POST /api/audiobooks/[id]/chapters/[chapterId]/segments - Create a new audio segment
export async function POST(request: NextRequest) {
  // Extract params from the URL path
  const url = new URL(request.url);
  const pathParts = url.pathname.split('/');
  const id = pathParts[pathParts.indexOf('audiobooks') + 1];
  const chapterId = pathParts[pathParts.indexOf('chapters') + 1];
  
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
        chapterId: chapterId,
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

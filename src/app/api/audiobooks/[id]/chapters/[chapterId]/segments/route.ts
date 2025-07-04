import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../../lib/prisma';

// GET /api/audiobooks/[id]/chapters/[chapterId]/segments - Get all audio segments for a chapter
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; chapterId: string } }
) {
  try {
    const audioSegments = await prisma.audioSegment.findMany({
      where: {
        chapterId: params.chapterId,
      },
      orderBy: {
        startTime: 'asc',
      },
    });

    return NextResponse.json(audioSegments);
  } catch (error) {
    console.error(`Error fetching audio segments for chapter ${params.chapterId}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch audio segments' },
      { status: 500 }
    );
  }
}

// POST /api/audiobooks/[id]/chapters/[chapterId]/segments - Create a new audio segment
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; chapterId: string } }
) {
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
        chapterId: params.chapterId,
      },
    });

    return NextResponse.json(audioSegment, { status: 201 });
  } catch (error) {
    console.error(`Error creating audio segment for chapter ${params.chapterId}:`, error);
    return NextResponse.json(
      { error: 'Failed to create audio segment' },
      { status: 500 }
    );
  }
}

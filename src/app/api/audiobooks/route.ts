import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

// GET /api/audiobooks - Get all audiobooks
export async function GET() {
  try {
    const audiobooks = await prisma.audiobook.findMany({
      include: {
        chapters: {
          orderBy: {
            orderIndex: 'asc',
          },
          select: {
            id: true,
            title: true,
            orderIndex: true,
          },
        },
      },
    });

    return NextResponse.json(audiobooks);
  } catch (error) {
    console.error('Error fetching audiobooks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audiobooks' },
      { status: 500 }
    );
  }
}

// POST /api/audiobooks - Create a new audiobook
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, author, coverImage, description, chapters } = body;

    // Create the audiobook
    const audiobook = await prisma.audiobook.create({
      data: {
        title,
        author,
        coverImage,
        description,
        chapters: {
          create: chapters.map((chapter: any, index: number) => ({
            title: chapter.title,
            content: chapter.content,
            orderIndex: index,
          })),
        },
      },
      include: {
        chapters: true,
      },
    });

    return NextResponse.json(audiobook, { status: 201 });
  } catch (error) {
    console.error('Error creating audiobook:', error);
    return NextResponse.json(
      { error: 'Failed to create audiobook' },
      { status: 500 }
    );
  }
}

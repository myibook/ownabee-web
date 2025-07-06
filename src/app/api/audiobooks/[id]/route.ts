import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET /api/audiobooks/[id] - Get a specific audiobook with chapters
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const audiobook = await prisma.audiobook.findUnique({
      where: {
        id,
      },
      include: {
        chapters: {
          orderBy: {
            orderIndex: 'asc',
          },
          include: {
            audioSegments: true,
          },
        },
      },
    });

    if (!audiobook) {
      return NextResponse.json(
        { error: 'Audiobook not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(audiobook);
  } catch (error) {
    const { id } = await params;
    console.error(`Error fetching audiobook ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to fetch audiobook' },
      { status: 500 }
    );
  }
}

// PUT /api/audiobooks/[id] - Update an audiobook
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, author, coverImage, description } = body;

    const audiobook = await prisma.audiobook.update({
      where: {
        id,
      },
      data: {
        title,
        author,
        coverImage,
        description,
      },
    });

    return NextResponse.json(audiobook);
  } catch (error) {
    const { id } = await params;
    console.error(`Error updating audiobook ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to update audiobook' },
      { status: 500 }
    );
  }
}

// DELETE /api/audiobooks/[id] - Delete an audiobook
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.audiobook.delete({
      where: {
        id,
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    const { id } = await params;
    console.error(`Error deleting audiobook ${id}:`, error);
    return NextResponse.json(
      { error: 'Failed to delete audiobook' },
      { status: 500 }
    );
  }
}

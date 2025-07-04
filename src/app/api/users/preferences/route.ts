import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// GET /api/users/preferences - Get user preferences
export async function GET(request: NextRequest) {
  try {
    // Using a global preference for the entire site
    const userId = 'default-user';
    
    const userPreferences = await prisma.userPreference.findUnique({
      where: {
        userId,
      },
    });

    if (!userPreferences) {
      // Return default preferences if none exist
      return NextResponse.json({
        userId,
        selectedVoiceId: null,
        playbackSpeed: 1.0,
        volume: 0.7,
      });
    }

    return NextResponse.json(userPreferences);
  } catch (error) {
    console.error('Error fetching user preferences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user preferences' },
      { status: 500 }
    );
  }
}

// POST /api/users/preferences - Create or update user preferences
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { selectedVoiceId, playbackSpeed, volume } = body;
    
    // Using a global preference for the entire site
    const userId = 'default-user';

    const userPreferences = await prisma.userPreference.upsert({
      where: {
        userId,
      },
      update: {
        selectedVoiceId,
        playbackSpeed,
        volume,
      },
      create: {
        userId,
        selectedVoiceId,
        playbackSpeed,
        volume,
      },
    });

    return NextResponse.json(userPreferences);
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return NextResponse.json(
      { error: 'Failed to update user preferences' },
      { status: 500 }
    );
  }
}

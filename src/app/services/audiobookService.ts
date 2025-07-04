// Service for interacting with audiobook API endpoints

// Get all audiobooks
export async function getAudiobooks() {
  const response = await fetch('/api/audiobooks');
  if (!response.ok) {
    throw new Error('Failed to fetch audiobooks');
  }
  return response.json();
}

// Get a specific audiobook with chapters and segments
export async function getAudiobook(id: string) {
  const response = await fetch(`/api/audiobooks/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch audiobook with ID ${id}`);
  }
  return response.json();
}

// Create a new audiobook
export async function createAudiobook(audiobookData: any) {
  const response = await fetch('/api/audiobooks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(audiobookData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create audiobook');
  }
  
  return response.json();
}

// Get audio segments for a chapter
export async function getAudioSegments(audiobookId: string, chapterId: string) {
  const response = await fetch(`/api/audiobooks/${audiobookId}/chapters/${chapterId}/segments`);
  if (!response.ok) {
    throw new Error(`Failed to fetch audio segments for chapter ${chapterId}`);
  }
  return response.json();
}

// Create an audio segment for a chapter
export async function createAudioSegment(audiobookId: string, chapterId: string, segmentData: any) {
  const response = await fetch(`/api/audiobooks/${audiobookId}/chapters/${chapterId}/segments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(segmentData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create audio segment');
  }
  
  return response.json();
}

// Get user preferences
export async function getUserPreferences() {
  const response = await fetch('/api/users/preferences');
  if (!response.ok) {
    throw new Error('Failed to fetch user preferences');
  }
  return response.json();
}

// Update user preferences
export async function updateUserPreferences(preferences: any) {
  const response = await fetch('/api/users/preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(preferences),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update user preferences');
  }
  
  return response.json();
}

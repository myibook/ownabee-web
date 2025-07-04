/**
 * Utility functions for text segmentation and highlighting
 */

/**
 * Split text into segments (sentences or paragraphs)
 * @param text The text to split
 * @param type The type of segmentation ('sentence' or 'paragraph')
 * @returns Array of text segments
 */
export function splitTextIntoSegments(text: string, type: 'sentence' | 'paragraph' = 'sentence'): string[] {
  if (type === 'paragraph') {
    // Split by paragraphs (double newlines)
    return text.split(/\n\s*\n/).filter(segment => segment.trim().length > 0);
  } else {
    // Split by sentences
    // This regex matches sentence endings (period, question mark, exclamation mark)
    // followed by a space or newline
    const segments = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [];
    return segments.map(segment => segment.trim()).filter(segment => segment.length > 0);
  }
}

/**
 * Estimate the duration of each text segment based on character count
 * This is a simple estimation - for real applications, you'd use the ElevenLabs API
 * to get accurate timestamps
 * 
 * @param segments Array of text segments
 * @param totalDuration Total audio duration in seconds
 * @returns Array of estimated durations for each segment
 */
export function estimateSegmentDurations(segments: string[], totalDuration: number): number[] {
  const totalCharacters = segments.reduce((sum, segment) => sum + segment.length, 0);
  
  // Calculate duration per character
  const durationPerChar = totalDuration / totalCharacters;
  
  // Calculate duration for each segment
  return segments.map(segment => segment.length * durationPerChar);
}

/**
 * Generate timestamp ranges for each segment
 * @param segmentDurations Array of segment durations
 * @returns Array of [startTime, endTime] tuples
 */
export function generateTimestamps(segmentDurations: number[]): [number, number][] {
  const timestamps: [number, number][] = [];
  let currentTime = 0;
  
  segmentDurations.forEach(duration => {
    const startTime = currentTime;
    const endTime = currentTime + duration;
    timestamps.push([startTime, endTime]);
    currentTime = endTime;
  });
  
  return timestamps;
}

/**
 * Find the current segment index based on current playback time
 * @param timestamps Array of [startTime, endTime] tuples
 * @param currentTime Current playback time in seconds
 * @returns Index of the current segment
 */
export function findCurrentSegmentIndex(timestamps: [number, number][], currentTime: number): number {
  return timestamps.findIndex(([start, end]) => currentTime >= start && currentTime < end);
}

"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ChevronDown, List, Loader2, Mic } from "lucide-react"
import { textToSpeech, generateChapterAudio, AVAILABLE_VOICES, DEFAULT_VOICE_ID } from "../utils/elevenlabs"
import { splitTextIntoSegments, estimateSegmentDurations, generateTimestamps, findCurrentSegmentIndex } from '../utils/textSegmentation'
import { uploadAudioToStorage, streamToBlob } from '../utils/blobStorage'
import { getAudiobook, getAudioSegments, createAudioSegment, getUserPreferences, updateUserPreferences } from '../services/audiobookService'

export default function AudiobookPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7) // 0 to 1
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const [isMuted, setIsMuted] = useState(false)
  const [showChapterContent, setShowChapterContent] = useState(false)
  const [showChapterList, setShowChapterList] = useState(false)
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0)
  const [chapterAudioUrls, setChapterAudioUrls] = useState<string[]>([])
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false)
  const [generationError, setGenerationError] = useState<string | null>(null)
  
  // State for database operations
  const [isLoadingFromDb, setIsLoadingFromDb] = useState(false)
  const [dbError, setDbError] = useState<string | null>(null)
  const [selectedVoiceId, setSelectedVoiceId] = useState(DEFAULT_VOICE_ID);
  const [showVoiceSelector, setShowVoiceSelector] = useState(false)
  const [isGeneratingAllChapters, setIsGeneratingAllChapters] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [currentAudioUrl, setCurrentAudioUrl] = useState("")
  
  // Text segmentation and highlighting state
  const [textSegments, setTextSegments] = useState<string[]>([])
  const [segmentTimestamps, setSegmentTimestamps] = useState<[number, number][]>([])
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(-1)
  
  // Database integration state
  const [audiobookId, setAudiobookId] = useState<string | null>(null)
  const [chapterIds, setChapterIds] = useState<string[]>([])
  const [audioSegments, setAudioSegments] = useState<any[]>([])

  // Define types for audiobook state
  type Chapter = {
    title: string;
    start: number;
  };

  const [audiobook, setAudiobook] = useState<{
    title: string;
    author: string;
    description: string;
    cover: string;
    audioUrl: string;
    chapters: Chapter[];
    chapterContents: string[];
  }>({
    title: "", // Will be loaded from database
    author: "", // Will be loaded from database
    description: "", // Will be loaded from database
    cover: "/images/audiobook-cover.png",
    audioUrl: "", // Will be set dynamically
    chapters: [], // Will be loaded from database
    chapterContents: [] // Will be loaded from database
  })

  // Load audiobook data from database
  async function loadAudiobookFromDb(id: string) {
    try {
      setIsLoadingFromDb(true);
      setDbError(null);
      
      const audiobookData = await getAudiobook(id);
      if (audiobookData) {
        setAudiobookId(audiobookData.id);
        
        // Update audiobook state with data from database
        setAudiobook({
          ...audiobook,
          title: audiobookData.title,
          author: audiobookData.author,
          description: audiobookData.description,
          // Update chapters array with data from database
          chapters: audiobookData.chapters.map((chapter: any, index: number) => ({
            title: chapter.title,
            start: index * 60, // Approximate start time
          })),
          // Update chapter contents array with data from database
          chapterContents: audiobookData.chapters.map((chapter: any) => chapter.content || '')
        });
        
        // Set chapter IDs
        if (audiobookData.chapters && audiobookData.chapters.length > 0) {
          const ids = audiobookData.chapters.map((chapter: { id: string }) => chapter.id);
          setChapterIds(ids);
          
          // Initialize chapter audio URLs array with the correct length
          setChapterAudioUrls(new Array(audiobookData.chapters.length).fill(''));
        }
        
        // Load audio segments for the first chapter
        if (audiobookData.chapters && audiobookData.chapters.length > 0) {
          await loadAudioSegments(audiobookData.id, audiobookData.chapters[0].id);
        }
      } else {
        setDbError('Audiobook not found in database');
      }
    } catch (error) {
      console.error('Error loading audiobook from database:', error);
      setDbError('Failed to load audiobook data. Please try again.');
    } finally {
      setIsLoadingFromDb(false);
    }
  }

  
  // Load audio segments for a specific chapter
  async function loadAudioSegments(audiobookId: string, chapterId: string) {
    try {
      setIsLoadingFromDb(true);
      setDbError(null);
      
      const segments = await getAudioSegments(audiobookId, chapterId);
      setAudioSegments(segments);
      
      // If we have segments, update the text segments and timestamps
      if (segments && segments.length > 0) {
        // Filter segments for the selected voice
        const voiceSegments = segments.filter((segment: { voiceId: string }) => 
          segment.voiceId === selectedVoiceId
        );
        
        if (voiceSegments.length > 0) {
          // Sort segments by start time
          voiceSegments.sort((a: { startTime: number }, b: { startTime: number }) => 
            a.startTime - b.startTime
          );
          
          // Extract text segments
          const texts = voiceSegments.map((segment: { textSegment: string }) => 
            segment.textSegment
          );
          setTextSegments(texts);
          
          // Extract timestamps
          const times = voiceSegments.map((segment: { startTime: number, endTime: number }) => 
            [segment.startTime, segment.endTime] as [number, number]
          );
          setSegmentTimestamps(times);
          
          // Use the first segment's audio URL if available
          if (voiceSegments[0] && voiceSegments[0].audioUrl) {
            setCurrentAudioUrl(voiceSegments[0].audioUrl);
          }
        } else {
          console.log('No segments found for the selected voice');
        }
      } else {
        console.log('No audio segments found for this chapter');
      }
      
      return segments;
    } catch (error) {
      console.error('Error loading audio segments:', error);
      setDbError('Failed to load audio segments. Please try again.');
      return [];
    } finally {
      setIsLoadingFromDb(false);
    }
  }
  
  // Generate audio for a single chapter using ElevenLabs API and save to database
  async function generateAudio() {
    if (isGeneratingAudio) return;

    setIsGeneratingAudio(true);
    setGenerationError(null);

    try {
      const chapterText = audiobook.chapterContents[selectedChapterIndex];
      const chapterId = chapterIds[selectedChapterIndex] || `chapter-${selectedChapterIndex}`;
      
      // Generate audio using ElevenLabs
      const audioStream = await textToSpeech(chapterText, selectedVoiceId);
      
      // Set the current audio URL directly from ElevenLabs
      setCurrentAudioUrl(audioStream);
      
      // For now, we'll use the audio URL directly from ElevenLabs
      // In a production app, we would upload to Vercel Blob Storage
      const audioUrl = audioStream;
      
      // Update the chapter audio URLs
      const newChapterAudioUrls = [...chapterAudioUrls];
      newChapterAudioUrls[selectedChapterIndex] = audioUrl;
      setChapterAudioUrls(newChapterAudioUrls);
      
      // If we have a valid audiobookId and chapterId, save to database
      if (audiobookId && chapterIds[selectedChapterIndex]) {
        // Create segments from the text
        const segments = splitTextIntoSegments(chapterText, 'sentence');
        const durations = estimateSegmentDurations(segments, audioRef.current?.duration || 60);
        
        // Save each segment to the database
        for (let i = 0; i < segments.length; i++) {
          // Extract start and end times from durations array safely
          let startTime = i * 5; // Default fallback
          let endTime = (i + 1) * 5; // Default fallback
          
          // Check if durations[i] exists and is an array
          const durationItem = durations[i];
          if (durationItem && Array.isArray(durationItem)) {
            if (durationItem.length >= 2) {
              startTime = Number(durationItem[0]);
              endTime = Number(durationItem[1]);
            }
          }
          
          const segmentData = {
            voiceId: selectedVoiceId,
            audioUrl: audioUrl, // Using the same URL for all segments of this chapter
            startTime,
            endTime,
            textSegment: segments[i]
          };
          
          await createAudioSegment(audiobookId, chapterIds[selectedChapterIndex], segmentData);
        }
      }
      
      // Load and play the audio
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.load();
        audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error generating audio:', error);
      setGenerationError('Failed to generate audio. Please try again.');
    } finally {
      setIsGeneratingAudio(false);
    }
  }
  
  // Generate audio for all chapters at once
  const generateAllAudio = async () => {
    try {
      setIsGeneratingAllChapters(true)
      setGenerationError(null)
      setGenerationProgress(0)
      
      const newAudioUrls = [...chapterAudioUrls]
      
      // Generate audio for each chapter sequentially
      for (let i = 0; i < audiobook.chapterContents.length; i++) {
        const chapterContent = audiobook.chapterContents[i]
        const audioUrl = await textToSpeech(chapterContent, selectedVoiceId)
        
        newAudioUrls[i] = audioUrl
        setChapterAudioUrls([...newAudioUrls])
        
        // Update progress
        setGenerationProgress(Math.round(((i + 1) / audiobook.chapterContents.length) * 100))
      }
      
      // Update the audio source to the first chapter
      if (audioRef.current && newAudioUrls[0]) {
        audioRef.current.src = newAudioUrls[0]
        audioRef.current.load()
      }
      
      setIsGeneratingAllChapters(false)
      setGenerationProgress(100)
    } catch (error) {
      console.error('Error generating all audio:', error)
      setGenerationError('Failed to generate all audio. Please try again.')
      setIsGeneratingAllChapters(false)
    }
  }

  // Load audiobook data from database and user preferences when component loads
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsGeneratingAudio(true);
        setGenerationError(null);
        setIsLoadingFromDb(true);
        setDbError(null);
        
        // Load user preferences
        const preferences = await getUserPreferences();
        if (preferences) {
          // Set preferred voice if available
          if (preferences.selectedVoiceId) {
            setSelectedVoiceId(preferences.selectedVoiceId);
          }
          
          // Set playback rate and volume
          if (preferences.playbackSpeed) {
            setPlaybackRate(preferences.playbackSpeed);
          }
          
          if (preferences.volume) {
            setVolume(preferences.volume);
          }
        }
        
        // Load audiobook data from database (using the first audiobook for now)
        const audiobookData = await getAudiobook('1'); // Assuming the first audiobook has ID '1'
        
        if (audiobookData) {
          setAudiobookId(audiobookData.id);
          
          // Update audiobook state with data from database
          setAudiobook({
            ...audiobook,
            title: audiobookData.title,
            author: audiobookData.author,
            description: audiobookData.description || '',
            // Update chapters array with data from database
            chapters: audiobookData.chapters.map((chapter: any, index: number) => ({
              title: chapter.title,
              start: index * 60, // Approximate start time
            })),
            // Update chapter contents array with data from database
            chapterContents: audiobookData.chapters.map((chapter: any) => chapter.content || '')
          });
          
          // Set chapter IDs
          if (audiobookData.chapters && audiobookData.chapters.length > 0) {
            const ids = audiobookData.chapters.map((chapter: { id: string }) => chapter.id);
            setChapterIds(ids);
            
            // Initialize chapter audio URLs array with the correct length
            setChapterAudioUrls(new Array(audiobookData.chapters.length).fill(''));
          }
          
          // Generate audio for the first chapter
          if (audiobookData.chapters && audiobookData.chapters.length > 0) {
            const chapterText = audiobookData.chapters[0].content;
            const audioUrl = await textToSpeech(chapterText, selectedVoiceId);
            
            // Update the chapter audio URLs
            const newChapterAudioUrls = new Array(audiobookData.chapters.length).fill('');
            newChapterAudioUrls[0] = audioUrl;
            setChapterAudioUrls(newChapterAudioUrls);
            
            setCurrentAudioUrl(audioUrl);
            
            // Segment the text for the first chapter
            const segments = splitTextIntoSegments(chapterText, 'sentence');
            setTextSegments(segments);
          }
        } else {
          setDbError('Audiobook not found in database');
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
        setGenerationError('Failed to load initial data. Please try again.');
        setDbError('Failed to load audiobook data from database.');
      } finally {
        setIsGeneratingAudio(false);
        setIsLoadingFromDb(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Effect to update segment timestamps when audio duration changes
  useEffect(() => {
    if (audioRef.current && textSegments.length > 0) {
      // Estimate durations based on text length and total audio duration
      const segmentDurations = estimateSegmentDurations(textSegments, audioRef.current.duration || 60);
      const timestamps = generateTimestamps(segmentDurations);
      
      // Ensure timestamps are properly typed as [number, number][] to avoid lint errors
      const typedTimestamps: [number, number][] = timestamps.map(stamp => {
        // Handle each timestamp safely to avoid type errors
        const stampItem = stamp;
        if (stampItem && Array.isArray(stampItem) && stampItem.length >= 2) {
          return [Number(stampItem[0]), Number(stampItem[1])];
        }
        return [0, 0]; // Default fallback
      });
      setSegmentTimestamps(typedTimestamps);
    }
  }, [audioRef.current?.duration, textSegments]);

  // Effect to update active segment during playback
  useEffect(() => {
    if (segmentTimestamps.length > 0) {
      const newActiveSegment = findCurrentSegmentIndex(segmentTimestamps, currentTime);
      if (newActiveSegment !== activeSegmentIndex) {
        setActiveSegmentIndex(newActiveSegment);
      }
    }
  }, [currentTime, segmentTimestamps]);

  // Set up audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)
    const togglePlay = () => setIsPlaying(!audio.paused)

    audio.addEventListener("loadeddata", setAudioData)
    audio.addEventListener("timeupdate", setAudioTime)
    audio.addEventListener("play", togglePlay)
    audio.addEventListener("pause", togglePlay)
    audio.addEventListener("ended", () => setIsPlaying(false))

    return () => {
      audio.removeEventListener("loadeddata", setAudioData)
      audio.removeEventListener("timeupdate", setAudioTime)
      audio.removeEventListener("play", togglePlay)
      audio.removeEventListener("pause", togglePlay)
      audio.removeEventListener("ended", () => setIsPlaying(false))
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
      audio.playbackRate = playbackRate
      audio.muted = isMuted
    }
    
    // Save user preferences when they change
    const saveUserPreferences = async () => {
      try {
        await updateUserPreferences({
          selectedVoiceId,
          playbackSpeed: playbackRate,
          volume
        });
      } catch (error) {
        console.error('Error saving user preferences:', error);
      }
    };
    
    // Debounce the preference saving to avoid too many API calls
    const timeoutId = setTimeout(() => {
      saveUserPreferences();
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [volume, playbackRate, isMuted, selectedVoiceId])

  const handlePlayPause = () => {
    const audio = audioRef.current
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSkip = (seconds: number) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + seconds))
    }
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  const handleToggleMute = () => {
    setIsMuted(!isMuted)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  const getCurrentChapterIndex = () => {
    for (let i = audiobook.chapters.length - 1; i >= 0; i--) {
      if (currentTime >= audiobook.chapters[i].start) {
        return i
      }
    }
    return 0 // Default for before the first chapter
  }
  
  const getCurrentChapterTitle = () => {
    const index = getCurrentChapterIndex();
    // 안전 검사: chapters 배열이 비어있거나 인덱스가 유효하지 않은 경우
    if (!audiobook.chapters || audiobook.chapters.length === 0 || !audiobook.chapters[index]) {
      return '로딩 중...';
    }
    return audiobook.chapters[index].title;
  }
  
  const toggleChapterContent = () => {
    setShowChapterContent(!showChapterContent)
  }

  // Function to handle chapter selection
  const handleChapterSelect = async (index: number) => {
    setSelectedChapterIndex(index);
    setShowChapterList(false);
    setShowChapterContent(false);
    
    // Reset audio player
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
      setIsPlaying(false);
      
      // Set audio source to the selected chapter if available
      if (chapterAudioUrls[index]) {
        audioRef.current.src = chapterAudioUrls[index];
        audioRef.current.load();
        setCurrentAudioUrl(chapterAudioUrls[index]);
      } else {
        // Generate audio for the selected chapter if not available
        try {
          setIsGeneratingAudio(true);
          setGenerationError(null);
          
          // Get chapter content from the database or state
          const chapterText = audiobook.chapterContents[index];
          if (!chapterText) {
            throw new Error('Chapter content not found');
          }
          
          // Generate audio using ElevenLabs
          const audioUrl = await textToSpeech(chapterText, selectedVoiceId);
          
          // Update the chapter audio URLs
          const newChapterAudioUrls = [...chapterAudioUrls];
          newChapterAudioUrls[index] = audioUrl;
          setChapterAudioUrls(newChapterAudioUrls);
          
          // Set current audio URL
          setCurrentAudioUrl(audioUrl);
          
          // Segment the text for the selected chapter
          const segments = splitTextIntoSegments(chapterText, 'sentence');
          setTextSegments(segments);
          
          // Update audio element
          if (audioRef.current) {
            audioRef.current.src = audioUrl;
            audioRef.current.load();
          }
        } catch (error) {
          console.error('Error generating audio for chapter:', error);
          setGenerationError('Failed to generate audio for this chapter. Please try again.');
        } finally {
          setIsGeneratingAudio(false);
        }
      }
    }
  };

  const handleSegmentClick = (segmentIndex: number) => {
    if (segmentIndex >= 0 && segmentIndex < segmentTimestamps.length && audioRef.current) {
      // Set audio time to the start of the clicked segment
      const [startTime] = segmentTimestamps[segmentIndex];
      audioRef.current.currentTime = startTime;
      setCurrentTime(startTime);
      setActiveSegmentIndex(segmentIndex);
      
      // Start playback if not already playing
      if (!isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(error => console.error('Error playing audio:', error));
      }
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-4 md:p-6 shadow-lg rounded-xl bg-white">
      {/* Database loading and error states */}
      {isLoadingFromDb && (
        <div className="bg-blue-50 text-blue-700 p-2 mb-4 rounded-md flex items-center">
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Loading audiobook data...
        </div>
      )}
      
      {dbError && (
        <div className="bg-red-50 text-red-700 p-2 mb-4 rounded-md">
          {dbError}
        </div>
      )}
      
      {/* Audiobook header */}
      <div className="flex flex-col items-center gap-4 p-0 mb-4">
        <Image
          src={audiobook.cover || "/placeholder.svg"}
          alt={audiobook.title}
          width={120}
          height={120}
          className="rounded-lg shadow-md"
        />
        <div className="text-center">
          <h2 className="text-xl font-bold">{audiobook.title}</h2>
          <p className="text-sm text-gray-600">{audiobook.author}</p>
          <p className="text-xs text-gray-600 mt-1">현재 챕터: {getCurrentChapterTitle()}</p>
        </div>
      </div>
      <div className="p-0">
        <audio ref={audioRef} src={currentAudioUrl || undefined} preload="metadata" crossOrigin="anonymous" />

        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="w-full mb-4">
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            step={1}
            onChange={(e) => handleSeek([parseFloat(e.target.value)])}
            className="w-full"
            aria-label="Playback progress"
          />
        </div>

        <div className="flex items-center justify-center gap-4 mb-6">
          <button 
            className="p-2 rounded-full hover:bg-gray-100" 
            onClick={() => handleSkip(-15)} 
            aria-label="Skip back 15 seconds"
          >
            <SkipBack className="h-6 w-6" />
          </button>
          <button
            className="rounded-full h-14 w-14 bg-blue-500 text-white flex items-center justify-center"
            onClick={handlePlayPause}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
          </button>
          <button 
            className="p-2 rounded-full hover:bg-gray-100" 
            onClick={() => handleSkip(15)} 
            aria-label="Skip forward 15 seconds"
          >
            <SkipForward className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 items-center mb-6">
          <div className="flex items-center gap-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-100" 
              onClick={handleToggleMute} 
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <div className="w-full">
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => handleVolumeChange([parseFloat(e.target.value)])}
                className="w-full"
                aria-label="Volume control"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <div className="relative">
              <button
                className="flex items-center gap-1 border rounded px-3 py-1 hover:bg-gray-100"
                onClick={() => document.getElementById('speed-dropdown')?.classList.toggle('hidden')}
                aria-label="Playback speed"
              >
                {playbackRate}x <ChevronDown className="h-4 w-4" />
              </button>
              <div id="speed-dropdown" className="absolute right-0 mt-1 bg-white border rounded shadow-lg hidden z-10">
                {[0.75, 1.0, 1.25, 1.5, 1.75, 2.0].map((rate) => (
                  <button
                    key={rate}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setPlaybackRate(rate);
                      document.getElementById('speed-dropdown')?.classList.add('hidden');
                    }}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>


        
        {/* Voice Selection */}
        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between items-center mb-3">
            <div className="relative">
              <button 
                className="flex items-center gap-1 text-sm font-medium bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md"
                onClick={() => setShowVoiceSelector(!showVoiceSelector)}
              >
                <Mic className="h-4 w-4" />
                {AVAILABLE_VOICES.find(voice => voice.id === selectedVoiceId)?.name || 'Select Voice'}
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showVoiceSelector && (
                <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-lg z-10 min-w-[250px]">
                  {AVAILABLE_VOICES.map(voice => (
                    <button
                      key={voice.id}
                      className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${voice.id === selectedVoiceId ? 'bg-blue-50 text-blue-600' : ''}`}
                      onClick={async () => {
                        setSelectedVoiceId(voice.id);
                        setShowVoiceSelector(false);
                        
                        // Store current playback position and state
                        const wasPlaying = isPlaying;
                        const currentPosition = audioRef.current?.currentTime || 0;
                        const currentSegment = activeSegmentIndex;
                        
                        // Generate audio for the current chapter when voice changes
                        try {
                          setIsGeneratingAudio(true);
                          setGenerationError(null);
                          
                          const chapterText = audiobook.chapterContents[selectedChapterIndex];
                          const audioUrl = await textToSpeech(chapterText, voice.id);
                          
                          setCurrentAudioUrl(audioUrl);
                          setIsGeneratingAudio(false);
                          
                          // If audio element exists, load the new source
                          if (audioRef.current) {
                            audioRef.current.load();
                            
                            // Set up an event listener for when the audio is loaded
                            const handleCanPlay = () => {
                              // Restore playback position
                              audioRef.current!.currentTime = currentPosition;
                              setCurrentTime(currentPosition);
                              
                              // Resume playback if it was playing before
                              if (wasPlaying) {
                                audioRef.current!.play()
                                  .then(() => setIsPlaying(true))
                                  .catch(error => console.error('Error resuming playback:', error));
                              }
                              
                              // Remove the event listener
                              audioRef.current!.removeEventListener('canplay', handleCanPlay);
                            };
                            
                            audioRef.current.addEventListener('canplay', handleCanPlay);
                          }
                        } catch (error) {
                          console.error('Error generating audio:', error);
                          setGenerationError('Failed to generate audio. Please try again.');
                          setIsGeneratingAudio(false);
                        }
                      }}
                    >
                      {voice.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-2 border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <List className="h-5 w-5" /> 챕터
            </h3>
            <button 
              className="text-xs text-blue-500 hover:underline"
              onClick={toggleChapterContent}
            >
              {showChapterContent ? '챕터 목록 보기' : '챕터 내용 보기'}
            </button>
          </div>
          
          {showChapterContent ? (
            <div className="bg-gray-50 p-4 rounded-lg mb-4 max-h-60 overflow-y-auto">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{audiobook.chapters[selectedChapterIndex].title}</h4>
              </div>
              {generationError && (
                <div className="text-red-500 text-xs mb-2">{generationError}</div>
              )}
              <div className="text-sm whitespace-pre-line">
                {textSegments.length > 0 ? (
                  textSegments.map((segment, index) => (
                    <span 
                      key={index}
                      onClick={() => handleSegmentClick(index)}
                      className={`cursor-pointer ${index === activeSegmentIndex ? 'bg-yellow-200 text-black' : ''} 
                                hover:bg-gray-200 transition-colors duration-200 inline`}
                    >
                      {segment}
                    </span>
                  ))
                ) : (
                  audiobook.chapterContents[selectedChapterIndex]
                )}
              </div>
            </div>
          ) : (
            <ul className="space-y-1 text-sm text-gray-600 max-h-60 overflow-y-auto pr-2">
              {audiobook.chapters.map((chapter, index) => (
                <li
                  key={index}
                  className={`p-2 rounded-md cursor-pointer ${
                    index === selectedChapterIndex 
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setSelectedChapterIndex(index);
                    
                    // If we have generated audio for this chapter, use it
                    if (chapterAudioUrls[index]) {
                      if (audioRef.current) {
                        audioRef.current.src = chapterAudioUrls[index];
                        audioRef.current.load();
                        audioRef.current.play();
                        setIsPlaying(true);
                      }
                    } else {
                      // Otherwise generate audio for this chapter
                      handleChapterSelect(index);
                    }
                  }}
                >
                  <span>{chapter.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

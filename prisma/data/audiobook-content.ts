// Define the chapter content type
export interface ChapterContent {
  id: number;
  title: string;
  content: string;
}

// The content of "The Little Star Who Lost Her Shine"
export const chapterContents: ChapterContent[] = [
  {
    id: 1,
    title: "Chapter 1: The Fading Light",
    content: `Stella, a little star, feels her light fading. The Moon tells her her shine comes from within.`
  },
  {
    id: 2,
    title: "Chapter 2: The Journey Begins",
    content: `Stella sets off to find her shine. The Cosmic Cloud advises her to visit the Northern Lights.`
  },
  {
    id: 3,
    title: "Chapter 3: The Northern Lights",
    content: `The Northern Lights remind Stella she shone brightest when helping others.`
  },
  {
    id: 4,
    title: "Chapter 4: Sharing the Light",
    content: `Stella helps a lost comet and discovers her light grows stronger through kindness.`
  },
  {
    id: 5,
    title: "Chapter 5: The Brightest Star",
    content: `Back home, Stella shines brightest of all, knowing true light comes from helping others.`
  }
];
import { PrismaClient } from '../src/generated/prisma';
import { chapterContents } from './data/audiobook-content';

// For debugging
console.log(`Found ${chapterContents.length} chapters to seed`);

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Create the audiobook
  const audiobook = await prisma.audiobook.create({
    data: {
      title: 'The Little Star Who Lost Her Shine',
      author: 'AI Author',
      description: 'A heartwarming story about a little star who lost her shine and her journey to find it again.',
      chapters: {
        create: chapterContents.map((chapter: { id: number; title: string; content: string }, index: number) => ({
          title: chapter.title,
          content: chapter.content,
          orderIndex: index
        }))
      }
    },
    include: {
      chapters: true
    }
  });
  
  console.log(`Created audiobook with ID: ${audiobook.id}`);
  console.log(`Created ${audiobook.chapters.length} chapters`);
  
  // Create default user preference
  const userPreference = await prisma.userPreference.create({
    data: {
      userId: 'default-user',
      selectedVoiceId: 'pNInz6obpgDQGcFmaJgB', // Default ElevenLabs voice ID
      playbackSpeed: 1.0,
      volume: 0.7
    }
  });
  
  console.log(`Created user preference with ID: ${userPreference.id}`);
}

main()
  .then(async () => {
    console.log('Database seeding completed successfully');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

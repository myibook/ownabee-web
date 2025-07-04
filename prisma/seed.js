// JavaScript version of the seed script
const { PrismaClient } = require('../src/generated/prisma');
const fs = require('fs');
const path = require('path');

// Read the TypeScript file content
const tsFilePath = path.join(__dirname, 'data', 'audiobook-content.ts');
const fileContent = fs.readFileSync(tsFilePath, 'utf8');

// Extract chapter contents using regex
const chapterContentsMatch = fileContent.match(/export const chapterContents.*?=\s*(\[[\s\S]*?\]);/s);
const chapterContentsString = chapterContentsMatch ? chapterContentsMatch[1] : '[]';

// Convert to JavaScript object (careful with this approach in production)
const chapterContents = eval(chapterContentsString);

// For debugging
console.log(`Found ${chapterContents.length} chapters to seed`);

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  try {
    // Create the audiobook
    const audiobook = await prisma.audiobook.create({
      data: {
        title: 'The Little Star Who Lost Her Shine',
        author: 'AI Author',
        description: 'A heartwarming story about a little star who lost her shine and her journey to find it again.',
        chapters: {
          create: chapterContents.map((chapter, index) => ({
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
  } catch (error) {
    console.error('Error during seeding:', error);
  }
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

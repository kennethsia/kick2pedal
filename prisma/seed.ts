import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clean the database
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane@example.com',
    },
  });

  // Create events
  const event1 = await prisma.event.create({
    data: {
      title: 'Mountain Biking Adventure',
      description: 'Join us for an exciting mountain biking trip!',
      date: new Date('2025-03-15T10:00:00Z'),
      location: 'Mountain Trail Park',
      maxCapacity: 20,
    },
  });

  await prisma.event.create({
    data: {
      title: 'City Night Ride',
      description: 'Evening bicycle tour around the city',
      date: new Date('2025-03-20T18:00:00Z'),
      location: 'City Center',
      maxCapacity: 15,
    },
  });

  // Create registrations
  await prisma.registration.create({
    data: {
      userId: user1.id,
      eventId: event1.id,
      status: 'CONFIRMED',
    },
  });

  await prisma.registration.create({
    data: {
      userId: user2.id,
      eventId: event1.id,
      status: 'PENDING',
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

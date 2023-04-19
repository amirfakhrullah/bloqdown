import { PrismaClient } from "@prisma/client";

/**
 * Context:
 * I'm migrating data from PlanetScale to Railway
 * (Need to free up my PlanetScale usage for other things)
 */

const prisma = new PrismaClient();

const prismaNew = new PrismaClient({
  log: ["query"],
  datasources: {
    db: {
      url: process.env.RAILWAY!,
    },
  },
});

const migrate = async () => {
  // users ======================
  console.log("migrating users");
  const users = await prisma.user.findMany();

  const migratedUsers = await prismaNew.user.createMany({
    data: users,
  });
  console.log("migratedUsers =>", migratedUsers);

  // accounts ======================
  console.log("migrating Accounts");
  const accounts = await prisma.account.findMany();

  const migratedAccounts = await prismaNew.account.createMany({
    data: accounts,
  });
  console.log("migratedAccounts =>", migratedAccounts);

  // sessions ======================
  console.log("migrating sessions");
  const sessions = await prisma.session.findMany();

  const migratedSessions = await prismaNew.session.createMany({
    data: sessions,
  });
  console.log("migratedSessions =>", migratedSessions);

  // VerificationTokens ======================
  console.log("migrating VerificationTokens");
  const tokens = await prisma.verificationToken.findMany();

  const migratedTokens = await prismaNew.verificationToken.createMany({
    data: tokens,
  });
  console.log("migratedTokens =>", migratedTokens);

  // Posts ======================
  console.log("migrating Posts");
  const posts = await prisma.post.findMany();

  const migratedPosts = await prismaNew.post.createMany({
    data: posts,
  });
  console.log("migratedPosts =>", migratedPosts);

  // Comments ======================
  console.log("migrating Comments");
  const comments = await prisma.comment.findMany();

  const migratedComments = await prismaNew.comment.createMany({
    data: comments,
  });
  console.log("migratedComments =>", migratedComments);

  // Likes ======================
  console.log("migrating Likes");
  const likes = await prisma.like.findMany();

  const migratedLikes = await prismaNew.like.createMany({
    data: likes,
  });
  console.log("migratedLikes =>", migratedLikes);

  // Tags ======================
  console.log("migrating Tags");
  const tags = await prisma.tag.findMany();

  const migratedTags = await prismaNew.tag.createMany({
    data: tags,
  });
  console.log("migratedTags =>", migratedTags);
};

migrate()
  .then(async () => {
    await Promise.all([prisma.$disconnect(), prismaNew.$disconnect()]);
  })
  .catch(async (e) => {
    console.error(e);
    await Promise.all([prisma.$disconnect(), prismaNew.$disconnect()]);
    process.exit(1);
  });

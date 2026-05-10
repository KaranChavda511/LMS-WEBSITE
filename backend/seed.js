import { configDotenv } from 'dotenv';
configDotenv();

import mongoose from 'mongoose';
import User from './models/user.model.js';
import Course from './models/course.model.js';

const MONGO_URI = process.env.MONGO_URI;

const SEED_EMAIL_DOMAIN = '@lumen.school';

const usersToSeed = [
  {
    fullName: 'admin',
    email: `admin${SEED_EMAIL_DOMAIN}`,
    password: 'admin123',
    role: 'ADMIN',
  },
  {
    fullName: 'maya rodriguez',
    email: `maya${SEED_EMAIL_DOMAIN}`,
    password: 'learner123',
    role: 'USER',
  },
  {
    fullName: 'tomás becker',
    email: `tomas${SEED_EMAIL_DOMAIN}`,
    password: 'learner123',
    role: 'USER',
  },
  {
    fullName: 'lina wang',
    email: `lina${SEED_EMAIL_DOMAIN}`,
    password: 'learner123',
    role: 'USER',
  },
];

const courseSeed = [
  {
    title: 'Production-grade Node.js services',
    category: 'Engineering',
    createdBy: 'Karan Chavda',
    description:
      'Build, monitor, and ship robust Node.js services. Covers project structure, error handling, observability, queues, and graceful deployment.',
    seed: 'node-prod',
    lectures: [
      'Project structure and conventions',
      'Error handling done right',
      'Logging, tracing, and metrics',
      'Background jobs with BullMQ',
      'Containerizing for production',
      'Zero-downtime deploys',
    ],
  },
  {
    title: 'Designing for trust',
    category: 'Product Design',
    createdBy: 'Asha Mehra',
    description:
      'Trust is a design output, not a marketing input. Learn the patterns top product teams use to make their interfaces feel safe, honest, and inevitable.',
    seed: 'trust-ux',
    lectures: [
      'What trust actually means in UI',
      'Microcopy as a trust device',
      'Onboarding without dark patterns',
      'Designing pricing pages',
      'Empty states and confidence',
    ],
  },
  {
    title: 'Practical data wrangling with Pandas',
    category: 'Data Science',
    createdBy: 'Rohit Kumar',
    description:
      'Stop fighting your dataframes. A field guide to fast, ergonomic Pandas with patterns from real production data work.',
    seed: 'pandas-real',
    lectures: [
      'Indexes that work for you',
      'Method chaining and pipelines',
      'Joins, merges, and the gotchas',
      'Time-series essentials',
      'Performance tuning',
    ],
  },
  {
    title: 'Shipping LLM features that work',
    category: 'ML / AI',
    createdBy: 'Maya Iyer',
    description:
      'Move past demos. A practitioner guide to evals, retrieval, prompting, and operating LLM features in production.',
    seed: 'llm-prod',
    lectures: [
      'From prototype to product',
      'Evals you can trust',
      'RAG without the headaches',
      'Prompt engineering for teams',
      'Cost, latency, and observability',
    ],
  },
  {
    title: 'Storytelling for B2B marketing',
    category: 'Marketing',
    createdBy: 'Aisha Khan',
    description:
      'B2B does not have to be boring. Sharpen positioning, pick a wedge, and write the kind of copy that makes founders forward your emails.',
    seed: 'b2b-story',
    lectures: [
      'Positioning before tactics',
      'Picking a wedge',
      'Writing copy that converts',
      'Case studies that read like fiction',
      'Distribution as a discipline',
    ],
  },
  {
    title: 'From engineer to founder',
    category: 'Business',
    createdBy: 'Vikram Singh',
    description:
      'You can code. Now learn to sell, hire, fundraise, and keep your sanity while doing it. A six-week founder bootcamp from a two-time exit.',
    seed: 'eng-founder',
    lectures: [
      'Picking the right idea',
      'Selling before building',
      'Hiring your first three',
      'Talking to investors',
      'Avoiding founder burnout',
    ],
  },
  {
    title: 'React Native in thirty days',
    category: 'Mobile Dev',
    createdBy: 'Priya Shah',
    description:
      'Ship a real cross-platform app this month. Navigation, native modules, offline storage, push, and a release checklist that actually works.',
    seed: 'rn-30d',
    lectures: [
      'Project setup that scales',
      'Navigation patterns',
      'Native modules without fear',
      'Offline-first storage',
      'Push notifications',
      'Submitting to stores',
    ],
  },
  {
    title: 'The tech lead playbook',
    category: 'Leadership',
    createdBy: 'Anuja Jha',
    description:
      'You got promoted. Now what? A practical guide to coaching, planning, and pushing back without burning bridges or burning out.',
    seed: 'tl-playbook',
    lectures: [
      'Your first ninety days',
      'Coaching senior engineers',
      'Planning that survives reality',
      'Pushing back upward',
      'Performance reviews without the dread',
    ],
  },
  {
    title: 'Smart contracts for skeptics',
    category: 'Web3',
    createdBy: 'Rahul Verma',
    description:
      'A grounded look at smart contracts. When they make sense, when they do not, and how to write ones that will not embarrass you.',
    seed: 'sc-skeptic',
    lectures: [
      'Why most things should not be on-chain',
      'Solidity essentials',
      'Testing and fuzzing',
      'Auditing your own code',
      'Gas, MEV, and reality checks',
    ],
  },
];

const buildLectures = (titles) =>
  titles.map((t, i) => ({
    title: t,
    description: `Lecture ${i + 1} — ${t}.`,
    lecture: {
      public_id: '',
      secure_url: '',
    },
  }));

const buildThumbnail = (slug) => ({
  public_id: `seed-${slug}`,
  secure_url: `https://picsum.photos/seed/${slug}/960/600`,
});

async function run() {
  if (!MONGO_URI) {
    console.error('MONGO_URI is missing in .env');
    process.exit(1);
  }

  console.log('connecting to MongoDB…');
  await mongoose.connect(MONGO_URI);
  console.log('connected');

  // Wipe seed-scoped data only (don't touch real user data the dev may have created)
  console.log('clearing previous seed data…');
  const seedEmails = usersToSeed.map((u) => u.email);
  await User.deleteMany({ email: { $in: seedEmails } });
  await Course.deleteMany({});

  console.log('inserting users…');
  for (const u of usersToSeed) {
    // create() runs the pre-save hash hook
    await User.create({
      ...u,
      avatar: { public_id: u.email, secure_url: '' },
    });
  }

  console.log('inserting courses…');
  for (const c of courseSeed) {
    const lectures = buildLectures(c.lectures);
    await Course.create({
      title: c.title,
      description: c.description,
      category: c.category,
      createdBy: c.createdBy,
      thumbnail: buildThumbnail(c.seed),
      lectures,
      numberOfLectures: lectures.length,
    });
  }

  const userCount = await User.countDocuments({ email: { $in: seedEmails } });
  const courseCount = await Course.countDocuments();

  console.log('\n✓ seed complete');
  console.log(`  users:   ${userCount}`);
  console.log(`  courses: ${courseCount}`);
  console.log('\nlogin credentials');
  console.log('  admin  → admin@lumen.school / admin123');
  console.log('  user   → maya@lumen.school / learner123');

  await mongoose.disconnect();
  process.exit(0);
}

run().catch(async (err) => {
  console.error('seed failed:', err);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});

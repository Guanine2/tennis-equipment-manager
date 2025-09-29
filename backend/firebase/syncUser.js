// /backend/firebase/syncNewUser.js

const { PrismaClient } = require('@prisma/client');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const path = require('path');

// Initialize Prisma Client
const prisma = new PrismaClient();

// Path to your service account JSON
const serviceAccountPath = path.join(__dirname, '../config/tennis-equipment-manager-firebase-adminsdk-fbsvc-638e71e074.json');
const serviceAccount = require(serviceAccountPath);

// Initialize Firebase Admin SDK (only once)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * Cloud Function triggered when a new Firebase user is created
 * Automatically syncs them to Supabase
 */
exports.syncNewUser = functions.auth.user().onCreate(async (user) => {
  try {
    console.log(`New Firebase user detected: ${user.uid}`);

    await prisma.users.upsert({
      where: { firebase_uid: user.uid },
      update: {
        email: user.email,
        display_name: user.displayName,
        profile_picture: user.photoURL,
      },
      create: {
        firebase_uid: user.uid,
        email: user.email,
        display_name: user.displayName,
        profile_picture: user.photoURL,
      },
    });

    console.log(`User ${user.uid} synced to Supabase.`);
  } catch (err) {
    console.error('Error syncing new user:', err);
  }
});
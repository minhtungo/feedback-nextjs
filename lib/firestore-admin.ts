// @ts-nocheck

import { db } from './firebase-admin';

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection('feedbacks')
      .where('siteId', '==', siteId)
      .get();

    const feedback = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    feedback.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return { feedback };
  } catch (error) {
    return { error };
  }
}

export async function getAllSites() {
  try {
    const snapshot = await db.collection('sites').get();

    const sites = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { sites };
  } catch (error) {
    return { error };
  }
}

export async function getUserSites(userId) {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', userId)
    .get();

  const sites = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { sites };
}

export async function getUserFeedback(userId) {
  const snapshot = await db
    .collection('feedbacks')
    .where('authorId', '==', userId)
    .get();
  const feedback = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { feedback };
}

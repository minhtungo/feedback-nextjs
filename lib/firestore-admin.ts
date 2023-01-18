// @ts-nocheck

import { db } from './firebase-admin';

export const getAllFeedback = async (siteId) => {
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
};

export const getAllSites = async () => {
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
};

export const getUserSites = async (userId) => {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', userId)
    .get();

  const sites = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { sites };
};

export const getUserFeedback = async (userId) => {
  const snapshot = await db
    .collection('feedbacks')
    .where('authorId', '==', userId)
    .where('status', '!=', 'removed')
    .get();
  const feedback = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return { feedback };
};

export const signUpForPlan = async (uid: string) => {
  const userRef = await db.collection('users').where('uid', '==', uid).get();
  const user = userRef.docs[0];
  await user.ref.update({ plan: 'trial' });
  return user.data();
};

// @ts-nocheck

import { db } from './firebase-admin';

export const getAllFeedback = async (siteId, route) => {
  try {
    const feedbackRef = db
      .collection('feedbacks')
      .where('siteId', '==', siteId);

    if (route) {
      feedbackRef.where('route', '==', route);
    }

    const snapshot = await feedbackRef.get();

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

export const getSite = async (siteId) => {
  try {
    const snapshot = await db.collection('sites').doc(siteId).get();

    const site = {
      id: snapshot.id,
      ...snapshot.data(),
    };

    return { site };
  } catch (error) {
    return { error };
  }
};

export const deleteSite = async (siteId)=> {
  try {
    const siteRef = db.collection('sites').doc(siteId);
    await siteRef.delete();

    // Delete all feedbacks related to this site
    const feedbacks = await db
      .collection('feedbacks')
      .where('siteId', '==', siteId)
      .get();

    feedbacks.forEach((feedback) => {
      feedback.ref.delete();
    });

    return { success: true };
  } catch (error) {
    return { error };
  }
}

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

export const signUpForPlan = async (userId: string) => {
  const userRef = db.collection('users').doc(userId);
  await userRef.update({ plan: 'trial' });
  return user.data();
};

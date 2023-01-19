import { db } from './firebase';
import {
  collection,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

export const createUser = async (userId: string, data: User) => {
  const newUserRef = doc(db, 'users', userId);
  await setDoc(newUserRef, data);
  return newUserRef;
};

export const createSite = async (data: Site) => {
  const newSiteRef = doc(collection(db, 'sites'));
  await setDoc(newSiteRef, data);
  return newSiteRef;
};

export const updateSite = async (siteId: string, newValues: any) => {
  const siteRef = doc(db, 'sites', siteId);
  await updateDoc(siteRef, newValues);
};

export const deleteSite = async (id: string) => {
  await deleteDoc(doc(db, 'sites', id));

  const feedbackRef = collection(db, 'feedbacks');
  const q = query(feedbackRef, where('siteId', '==', id));
  const docSnap = await getDocs(q);
  docSnap.forEach((doc) => {
    deleteDoc(doc.ref);
  });

  return feedbackRef;
};

export const createFeedback = async (data: Feedback) => {
  const newFeedbackRef = doc(collection(db, 'feedbacks'));
  await setDoc(newFeedbackRef, data);
  return newFeedbackRef;
};

export const deleteFeedback = async (id: string) => {
  const feedbackRef = await deleteDoc(doc(db, 'feedbacks', id));
  return feedbackRef;
};

export const updateFeedback = async (id: string, newValues: any) => {
  const feedbackRef = doc(db, 'feedbacks', id);
  await updateDoc(feedbackRef, newValues);
};

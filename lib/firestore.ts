import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

export const createUser = async (uid, data) => {
  const userRef = await addDoc(collection(db, 'users'), {
    uid,
    ...data,
  });
  return userRef;
};

export const createSite = async (data: Site) => {
  const newSiteRef = doc(collection(db, 'sites'));
  await setDoc(newSiteRef, data);
  return newSiteRef;
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

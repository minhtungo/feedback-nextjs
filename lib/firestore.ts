import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc } from 'firebase/firestore';

export const createUser = async (uid, data) => {
  const userRef = await addDoc(collection(db, 'users'), {
    uid,
    ...data,
  });
  return userRef;
};

export const createSite = async (data: Site) => {
  const siteRef = await addDoc(collection(db, 'sites'), data);
  return siteRef;
};

export const createFeedback = async (data: Feedback) => {
  const feedbackRef = await addDoc(collection(db, 'feedbacks'), data);
  return feedbackRef;
};

export const deleteFeedback = async (id: string) => {
  const feedbackRef = await deleteDoc(doc(db, 'feedbacks', id));
  return feedbackRef;
};

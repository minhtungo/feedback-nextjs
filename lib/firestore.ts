import { db } from './firebase';
import { collection, addDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';

export const createUser = async (uid: string, data: User) => {
  const newUserRef = doc(collection(db, 'users'));

  await setDoc(newUserRef, data);
  return newUserRef;
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

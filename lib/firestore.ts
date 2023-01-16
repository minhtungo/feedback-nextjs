import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export const createUser = async (uid, data) => {
  try {
    const userRef = await addDoc(collection(db, 'users'), {
      uid,
      ...data,
    });
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const createSite = async (data: Site) => {
  try {
    const userRef = await addDoc(collection(db, 'sites'), data);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

export const createFeedback = async (data: Feedback) => {
  try {
    const feedbackRef = await addDoc(collection(db, 'feedbacks'), data);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

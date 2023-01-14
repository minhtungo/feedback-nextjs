import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

export const createUser = async (uid, data) => {
  try {
    const userRef = await addDoc(collection(db, 'users'), {
      uid,
      ...data,
    });
    console.log(userRef);
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

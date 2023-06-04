import { db } from '@lib/firebase/client';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { currentDate } from '../constants';

export const createPost = async (
  post: { text: string },
  user: { id: string; username: string },
  boardCode: string,
  groupId: string
) => {
  const id = nanoid();

  try {
    const boardsRef = collection(db, 'boards');
    const q = query(boardsRef, where('boardCode', '==', boardCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { status: 'error', message: 'No Board Found' };
    } else {
      const boardDoc = querySnapshot.docs[0];
      const boardRef = doc(db, 'boards', boardDoc.id);
      const groupsRef = collection(boardRef, 'groups');
      const q = query(groupsRef, where('id', '==', groupId));
      const groupQuerySnapshot = await getDocs(q);

      if (groupQuerySnapshot.empty) {
        return { status: 'error', message: 'No Group Found' };
      } else {
        const groupDoc = groupQuerySnapshot.docs[0];
        const groupRef = doc(boardRef, 'groups', groupDoc.id);
        const allPostsCollectionRef = collection(groupRef, 'allPosts');

        const newPost = {
          id,
          text: post.text,
          user: {
            id: user.id,
            username: user.username,
          },
          likes: 0,
          dislikes: 0,
          createdAt: currentDate,
          comments: [],
        };

        const postDoc = await addDoc(allPostsCollectionRef, newPost);
        return {
          status: 'success',
          message: `Post sent successfully!.`,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const getGroupPosts = async (boardCode: string, groupId: string) => {
  try {
    // TO-DO: Abstract up to the point of getting refrence to allPosts
    const boardsRef = collection(db, 'boards');
    const q = query(boardsRef, where('boardCode', '==', boardCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { status: 'error', message: 'No Board Found' };
    } else {
      const boardDoc = querySnapshot.docs[0];
      const boardRef = doc(db, 'boards', boardDoc.id);
      const groupsRef = collection(boardRef, 'groups');
      const q = query(groupsRef, where('id', '==', groupId));
      const groupQuerySnapshot = await getDocs(q);

      if (groupQuerySnapshot.empty) {
        return { status: 'error', message: 'No Group Found' };
      } else {
        const groupDoc = groupQuerySnapshot.docs[0];
        const groupRef = doc(boardRef, 'groups', groupDoc.id);
        const allPostsCollectionRef = collection(groupRef, 'allPosts');

        const snapshot = await getDocs(allPostsCollectionRef);
        if (snapshot.empty) {
          console.log('No matching document');
          return { status: 'error', message: 'No posts in group yet' };
        } else {
          const posts = snapshot.docs.map((doc) => doc.data());
          return { status: 'success', data: posts };
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return { status: 'error', message: error };
    }
  }
};

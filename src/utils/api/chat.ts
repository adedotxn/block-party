import { db } from '@lib/firebase/client';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
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
    const groupRef = await getGroupRef(boardCode, groupId);

    if (groupRef.status === 'success' && groupRef.ref) {
      const allPostsCollectionRef = collection(groupRef.ref, 'allPosts');
      const newPost = {
        id,
        text: post.text,
        user: {
          id: user.id,
          username: user.username,
        },
        likes: 0,
        likedBy: [],
        dislikes: 0,
        createdAt: currentDate,
        comments: [],
      };

      const postDoc = await addDoc(allPostsCollectionRef, newPost);
      return {
        status: 'success',
        message: `Post sent successfully!.`,
      };
    } else {
      return { status: groupRef.status, message: groupRef.message };
    }
  } catch (error) {
    console.log(error);
  }
};

export const getGroupPosts = async (boardCode: string, groupId: string) => {
  try {
    const groupRef = await getGroupRef(boardCode, groupId);

    if (groupRef.status === 'success' && groupRef.ref) {
      const allPostsCollectionRef = collection(groupRef.ref, 'allPosts');

      const snapshot = await getDocs(allPostsCollectionRef);
      if (snapshot.empty) {
        console.log('No matching document');
        return { status: 'success', data: [] };
      } else {
        const posts = snapshot.docs.map((doc) => doc.data());
        return { status: 'success', data: posts };
      }
    } else {
      return { status: groupRef.status, message: groupRef.message };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { status: 'error', message: error };
    }
  }
};

export const likeAPost = async (
  boardCode: string,
  groupId: string,
  postId: string,
  user: { id: string }
) => {
  const groupRef = await getGroupRef(boardCode, groupId);

  if (groupRef.status === 'success' && groupRef.ref) {
    const allPostsCollectionRef = collection(groupRef.ref, 'allPosts');
    const q = query(allPostsCollectionRef, where('id', '==', postId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];

      try {
        await updateDoc(doc.ref, {
          likedBy: arrayUnion(user),
          likes: increment(1),
        });
        return { status: 'success' };
      } catch (error) {
        if (error instanceof Error) {
          return { status: 'error', message: error };
        }
      }
    }
  }
};

async function getGroupRef(boardCode: string, groupId: string) {
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
      return { status: 'success', ref: groupRef };
    }
  }
}
